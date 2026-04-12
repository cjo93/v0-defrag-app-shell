import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const priceMap: Record<string, string | undefined> = {
  base: process.env.STRIPE_PRICE_ID_BASE,
  core: process.env.STRIPE_PRICE_ID_CORE,
  studio: process.env.STRIPE_PRICE_ID_STUDIO,
};

function getSiteUrl(path = "") {
  const site = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
  if (site) {
    const base = site.startsWith("http") ? site : `https://${site}`;
    return base.replace(/\/$/, "") + (path.startsWith("/") ? path : "/" + path);
  }
  return path;
}

export async function POST(req: Request) {
  if (!stripeSecretKey) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 503 });
  }
  const stripe = new Stripe(stripeSecretKey);

  let tier: string | undefined;
  let customer_email: string | undefined;
  try {
    const body = await req.json();
    tier = (body.tier || "").toLowerCase();
    customer_email = body.email;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!tier || !priceMap[tier]) {
    return NextResponse.json({ error: "Invalid or missing plan." }, { status: 400 });
  }

  try {
    const origin = getSiteUrl("");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceMap[tier],
          quantity: 1,
        },
      ],
      metadata: {
        app_user_id: 'anonymous',
        plan: tier,
      },
      subscription_data: {
        metadata: {
          app_user_id: 'anonymous',
          plan: tier,
        },
      },
      success_url: `${origin}/login?next=/dashboard`,
      cancel_url: `${origin}/pricing`,
      allow_promotion_codes: true,
      ...(customer_email && { customer_email }),
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create session." }, { status: 500 });
  }
}
