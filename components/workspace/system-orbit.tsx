"use client"

export function SystemOrbit({ participants = [], dynamic = 'dyadic' }: { participants?: { id?: string; label: string }[]; dynamic?: string }) {
  const count = Math.max(1, participants.length)
  const centerX = 100
  const centerY = 70
  const radius = 36

  return (
    <div className="w-full max-w-xs">
      <svg viewBox="0 0 200 140" className="w-full h-36">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#7ee7e0" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#f6c27a" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <circle cx={centerX} cy={centerY} r={radius + 6} fill="url(#g1)" opacity="0.6" />
        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="currentColor" strokeOpacity="0.06" />
        {participants.map((p, i) => {
          const angle = (i / count) * Math.PI * 2 - Math.PI / 4
          const x = centerX + Math.cos(angle) * (radius + 26)
          const y = centerY + Math.sin(angle) * (radius + 18)
          return (
            <g key={p.id ?? i}>
              <circle cx={x} cy={y} r={12} fill="currentColor" fillOpacity={0.08} />
              <text x={x} y={y + 20} textAnchor="middle" className="fill-current text-[9px]">
                {p.label}
              </text>
            </g>
          )
        })}
        <text x={centerX} y={centerY + 4} textAnchor="middle" className="fill-current text-[10px] font-semibold" opacity={0.9}>
          {dynamic === 'dyadic' ? 'Dyadic field' : dynamic === 'triadic' ? 'Triadic field' : 'System view'}
        </text>
      </svg>
    </div>
  )
}

