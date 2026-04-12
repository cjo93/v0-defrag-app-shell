// Centralized entitlement logic for DEFRAG
// Tiers: free, base, core, studio

export function hasAccess(tier: string | null, required: string) {
  const order = ["free", "base", "core", "studio"];
  return order.indexOf(tier ?? "free") >= order.indexOf(required);
}

export const TIERS = ["free", "base", "core", "studio"] as const;
export type SubscriptionTier = typeof TIERS[number];

