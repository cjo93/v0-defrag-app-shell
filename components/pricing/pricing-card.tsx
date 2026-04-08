import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface PricingCardProps {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}

export function PricingCard({
  name,
  price,
  description,
  features,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-lg border p-8 space-y-6 transition ${
        highlighted
          ? 'border-primary bg-card ring-1 ring-primary'
          : 'border-border bg-secondary'
      }`}
    >
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div>
        <span className="text-3xl font-bold text-foreground">{price}</span>
        {price !== 'Custom' && <span className="text-sm text-muted-foreground">/month</span>}
      </div>

      <Button asChild className="w-full">
        <Link href="/dashboard">Get Started</Link>
      </Button>

      <ul className="space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}
