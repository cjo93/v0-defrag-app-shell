import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'

interface PricingCardProps {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
  contactOnly?: boolean
}

export function PricingCard({
  name,
  price,
  description,
  features,
  highlighted = false,
  contactOnly = false,
}: PricingCardProps) {
  const [loading, setLoading] = useState(false);
  const plan = name.toLowerCase();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: plan })
      });
      const data = await res.json();
      if (res.status === 401 || res.status === 403) {
        // Not authorized — route user to signup/login preserving plan intent
        window.location.href = `/signup?next=/pricing&plan=${encodeURIComponent(plan)}`
        return
      }
      if (data?.url) {
        window.location.href = data.url;
      } else {
        // Surface an inline alert rather than silently failing
        alert(data?.error || 'Checkout is currently unavailable. Please try again later or contact support.')
      }
    } catch (err) {
      console.error('Checkout error', err);
      alert('Payment service is currently unavailable. Please try again later.')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`rounded-[28px] p-10 space-y-8 transition duration-300 ${
        highlighted
          ? 'bg-white/[0.04] ring-1 ring-white/8 shadow-[0_8px_40px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="space-y-3">
        <h3 className="font-semibold text-2xl tracking-tight text-stone-50">{name}</h3>
        <p className="text-sm leading-6 text-stone-400">{description}</p>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight text-stone-50">{price}</span>
        {price !== 'Custom' && <span className="text-sm font-medium text-stone-500 uppercase tracking-wider">/ mo</span>}
      </div>

      {contactOnly ? (
        <Button asChild className={`w-full h-12 rounded-full font-semibold transition bg-white/10 text-stone-100 hover:bg-white/20 border border-white/10`}>
          <Link href="mailto:info@defrag.app">Contact us</Link>
        </Button>
      ) : (
        <Button
          className={`w-full h-12 rounded-full font-semibold transition ${
            highlighted
              ? 'bg-stone-100 text-stone-950 hover:bg-white'
              : 'bg-white/10 text-stone-100 hover:bg-white/20 border border-white/10'
          }`}
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Redirecting…' : 'Get Started'}
        </Button>
      )}

      <ul className="space-y-4 pt-4 border-t border-white/5">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-stone-300 leading-relaxed">
            <svg className="w-5 h-5 text-emerald-400/80 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}
