
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  if (!stripeSecretKey || !webhookSecret) {
    console.error("[Stripe Webhook] Stripe is not configured.");
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 503 });
  }
  const stripe = new Stripe(stripeSecretKey);
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig || "", webhookSecret);
  } catch (err) {
    console.error("[Stripe Webhook] Invalid signature", err);
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
    let idempotencyKey: string | undefined;

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      userId = session.metadata?.app_user_id;
      plan = session.metadata?.plan;
      stripeCustomerId = session.customer as string;
      subscriptionStatus = "active";
      idempotencyKey = `checkout_${session.id}`;
    } else if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      userId = subscription.metadata?.app_user_id;
      plan = subscription.metadata?.plan;
      stripeCustomerId = subscription.customer as string;
      subscriptionStatus = subscription.status;
      idempotencyKey = `sub_${subscription.id}_${subscription.status}`;
    } else if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;
      // Stripe API returns 'subscription' in the webhook payload, but types may not expose it
      // @ts-expect-error: Stripe types may not expose 'subscription' but it is present in payload
      const subId = invoice['subscription'] as string | undefined;
      if (subId) {
        const subscription = await stripe.subscriptions.retrieve(subId);
        userId = subscription.metadata?.app_user_id;
        plan = subscription.metadata?.plan;
        stripeCustomerId = subscription.customer as string;
        subscriptionStatus = subscription.status;
        idempotencyKey = `invoice_${invoice.id}`;
      }
    }

    if (!userId || !plan || !stripeCustomerId) {
      console.warn(`[Stripe Webhook] Missing user or plan info. userId=${userId}, plan=${plan}, customerId=${stripeCustomerId}`);
      // Always return 200 to Stripe to avoid repeated failures, but log for investigation
      return NextResponse.json({ received: true });
    }

    // Idempotency: check if this event has already been processed
    try {
      const { data: existing, error: idemError } = await supabase
        .from("stripe_webhook_events")
        .select("id")
        .eq("idempotency_key", idempotencyKey)
        .maybeSingle();
      if (idemError) {
        console.error("[Stripe Webhook] Idempotency check failed", idemError);
      }
      if (existing) {
        console.log(`[Stripe Webhook] Duplicate event ignored: ${idempotencyKey}`);
        return NextResponse.json({ received: true });
      }
      // Mark this event as processed
      await supabase.from("stripe_webhook_events").insert({ idempotency_key: idempotencyKey, event_type: event.type });
    } catch (err) {
      console.error("[Stripe Webhook] Idempotency insert failed", err);
      // Continue anyway to avoid blocking entitlement
    }

    // Update user profile in Supabase
    try {
      const { error, data } = await supabase
        .from("profiles")
        .update({
          subscription_tier: plan,
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_status: subscriptionStatus,
        })
        .eq("id", userId)
        .select("id");
      if (error) {
        console.error(`[Stripe Webhook] Failed to update profile for user ${userId}:`, error.message);
        // Always return 200 to Stripe to avoid repeated failures
        return NextResponse.json({ received: true });
      }
      if (!data || data.length === 0) {
        console.warn(`[Stripe Webhook] No profile found for user ${userId}`);
        return NextResponse.json({ received: true });
      }
      console.log(`[Stripe Webhook] Updated profile for user ${userId} to plan ${plan}`);
    } catch (err) {
      console.error(`[Stripe Webhook] Exception updating profile for user ${userId}:`, err);
      return NextResponse.json({ received: true });
    }
  }

  return NextResponse.json({ received: true });
}
