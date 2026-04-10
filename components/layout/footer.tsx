import Link from 'next/link'

const footerLinks = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/learn', label: 'Learn' },
  { href: '/invite', label: 'Invite' },
  { href: '/settings', label: 'Settings' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#06080f] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/74">
              Defrag
            </span>
            <h3 className="max-w-xl text-2xl font-semibold tracking-[-0.04em] text-white/92 sm:text-3xl">
              A premium relational workspace built to slow the moment down before it hardens.
            </h3>
            <p className="max-w-2xl text-sm leading-7 text-white/60">
              Keep the language plain, keep the field visible, and keep privacy explicit. This surface is designed to
              feel steady before billing and auth are fully wired for launch.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-5 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Move through the product</p>
              <div className="mt-4 space-y-3">
                {footerLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="block text-sm text-white/68 transition hover:text-white/88">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/8 bg-gradient-to-br from-primary/12 via-primary/5 to-black/20 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Next best action</p>
              <p className="mt-3 text-sm leading-6 text-white/72">
                Use the dashboard for signal grouping, then move into the workspace when wording and timing matter.
              </p>
              <Link
                href="/dashboard"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-black transition hover:bg-white/92"
              >
                Open command center
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-white/34 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Defrag. Calm, premium, plain-language relational intelligence.</p>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="transition hover:text-white/74">
              Sign in
            </Link>
            <Link href="/workspace" className="transition hover:text-white/74">
              Workspace
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
