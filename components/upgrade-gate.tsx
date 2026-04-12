import React from "react";
import Link from "next/link";

interface UpgradeGateProps {
  requiredTier: string;
  currentTier: string | null;
  benefit?: string;
  className?: string;
}

export function UpgradeGate({ requiredTier, currentTier, benefit, className }: UpgradeGateProps) {
  return (
    <div className={`rounded-xl border border-neutral-200 bg-white/80 p-6 text-center shadow-md max-w-md mx-auto ${className ?? ""}`}>
      <div className="text-lg font-semibold mb-2">Upgrade required</div>
      <div className="mb-4 text-neutral-700">
        {benefit ? benefit : `Unlock this feature with the ${requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)} plan.`}
      </div>
      <Link href="/pricing">
        <button className="bg-black text-white rounded-lg px-5 py-2 font-medium hover:bg-neutral-800 transition">View Plans</button>
      </Link>
    </div>
  );
}

