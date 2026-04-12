import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  if (!stripeSecretKey || !webhookSecret) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 503 });
  }
  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig || "", webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  // Only handle relevant events
  if (
    event.type === "checkout.session.completed" ||
    event.type === "customer.subscription.updated" ||
    event.type === "invoice.payment_succeeded"
  ) {
    const supabase = getSupabaseAdmin();
    let userId: string | undefined;
    let plan: string | undefined;
    let stripeCustomerId: string | undefined;
    let subscriptionStatus: string | undefined;

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      userId = session.metadata?.app_user_id;
      plan = session.metadata?.plan;
      stripeCustomerId = session.customer as string;
      subscriptionStatus = "active";
    } else if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      userId = subscription.metadata?.app_user_id;
      plan = subscription.metadata?.plan;
      stripeCustomerId = subscription.customer as string;
      subscriptionStatus = subscription.status;
    } else if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;
      if (invoice.subscription) {
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
        userId = subscription.metadata?.app_user_id;
        plan = subscription.metadata?.plan;
        stripeCustomerId = subscription.customer as string;
        subscriptionStatus = subscription.status;
      }
    }

    if (!userId || !plan || !stripeCustomerId) {
      return NextResponse.json({ error: "Missing user or plan info." }, { status: 400 });
    }

    // Update user profile in Supabase
    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_tier: plan,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_status: subscriptionStatus,
      })
      .eq("id", userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

