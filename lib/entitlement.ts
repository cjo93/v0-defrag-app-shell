// Centralized entitlement logic for DEFRAG
// Tiers: free, base, core, studio

export function hasAccess(tier: string | null, required: string) {
  const order = ["free", "base", "core", "studio"];
  return order.indexOf(tier ?? "free") >= order.indexOf(required);
}

export const TIERS = ["free", "base", "core", "studio"] as const;
export type SubscriptionTier = typeof TIERS[number];

// Get user tier from profile object (server context)
export function getUserTier(profile: { subscription_tier?: string } | null | undefined): SubscriptionTier {
  if (!profile || !profile.subscription_tier) return "free";
  if (TIERS.includes(profile.subscription_tier as SubscriptionTier)) {
    return profile.subscription_tier as SubscriptionTier;
  }
  return "free";
}

// Require a minimum tier, return error if not met
export function requireTier(profile: { subscription_tier?: string } | null | undefined, required: SubscriptionTier) {
  const tier = getUserTier(profile);
  if (!hasAccess(tier, required)) {
    return {
      error: "upgrade_required",
      requiredTier: required,
    };
  }
  return null;
}
