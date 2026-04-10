'use client'

import Link from 'next/link'

const settingsSections = [
  {
    title: 'Profile',
    description: 'Keep your core account details and display preferences easy to review.',
  },
  {
    title: 'Framework preferences',
    description: 'Choose which symbolic layers stay available behind the scenes.',
  },
  {
    title: 'Privacy and data',
    description: 'Control what Defrag keeps, what it uses to improve, and what stays strictly personal.',
  },
  {
    title: 'Workspace defaults',
    description: 'Set how much context you want visible when you open the field.',
  },
]

export default function SettingsPage() {
  const [showFrameworks, setShowFrameworks] = useState(false)

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.14),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(94,234,212,0.08),transparent_22%),linear-gradient(180deg,#05060a_0%,#080a11_42%,#05060a_100%)] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Settings</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-[-0.05em] text-white/92 sm:text-4xl">Tune Defrag without breaking the calm.</h1>
          </div>
          <Link href="/dashboard" className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/72 transition hover:border-white/16 hover:bg-white/[0.08] hover:text-white">
            Back
          </Link>
        </div>

        <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Overview</p>
            <div className="mt-5 grid gap-3">
              {settingsSections.map((section) => (
                <div key={section.title} className="rounded-2xl border border-white/8 bg-black/18 p-4">
                  <p className="text-base font-semibold text-white/88">{section.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/62">{section.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Quick controls</p>
              <div className="mt-5 grid gap-3">
                {[
                  'Email and display name',
                  'Frameworks shown in analysis',
                  'Weekly brief delivery',
                  'Branch lane default behavior',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-black/18 px-4 py-4 text-sm leading-6 text-white/68">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-red-400/16 bg-gradient-to-br from-red-400/10 via-red-400/4 to-black/16 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Careful actions</p>
              <div className="mt-5 space-y-3">
                {[
                  'Export your data',
                  'Clear session history',
                  'Remove private material permanently',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-black/18 px-4 py-4 text-sm leading-6 text-white/68">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
