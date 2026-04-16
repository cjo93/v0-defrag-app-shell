'use client'

import Link from 'next/link'
import { useState } from 'react'

const settingsSections = [
  {
    title: 'Profile',
    description: 'Keep your identity and tone settings easy to review before the workspace opens.',
  },
  {
    title: 'Framework visibility',
    description: 'Keep symbolic layers available without letting them overwhelm the product.',
  },
  {
    title: 'Privacy and data',
    description: 'Control what is stored, what is shareable, and what stays personal.',
  },
  {
    title: 'Workspace defaults',
    description: 'Choose how much field context, briefing, and branch support you want visible by default.',
  },
]

const quickControls = [
  'Email and display name',
  'Branch lane default behavior',
  'Weekly brief delivery',
  'Invite permissions',
]

export default function SettingsPage() {
  const [showFrameworks, setShowFrameworks] = useState(false)

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.14),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(94,234,212,0.08),transparent_22%),linear-gradient(180deg,#05060a_0%,#080a11_42%,#05060a_100%)] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Settings</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-[-0.05em] text-white/92 sm:text-4xl">
              Tune Defrag without making the product feel colder.
            </h1>
          </div>
          <Link href="/dashboard" className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/72 transition hover:border-white/16 hover:bg-white/[0.08] hover:text-white">
            Back
          </Link>
        </div>

        <section className="grid gap-4 xl:grid-cols-[1fr_0.92fr]">
          <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Core controls</p>
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
            <div className="rounded-[1.8rem] border border-primary/16 bg-gradient-to-br from-primary/12 via-primary/6 to-black/16 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Framework layer</p>
                  <h2 className="mt-2 text-lg font-semibold text-white/90">Keep the symbolic system optional.</h2>
                </div>
                <button
                  onClick={() => setShowFrameworks((value) => !value)}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/76 transition hover:border-white/16 hover:bg-white/[0.08]"
                >
                  {showFrameworks ? 'Hide' : 'Show'}
                </button>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/68">
                Defrag should stay plain-language first. These controls exist so the educational and symbolic layers stay
                available without taking over the surface.
              </p>

              {showFrameworks && (
                <div className="mt-4 grid gap-3">
                  {['Astrology timing layer', 'Human Design pacing layer', 'Gene Keys pattern layer'].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/8 bg-black/18 px-4 py-4 text-sm leading-6 text-white/72">
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Quick controls</p>
              <div className="mt-5 grid gap-3">
                {quickControls.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-black/18 px-4 py-4 text-sm leading-6 text-white/68">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-red-400/16 bg-gradient-to-br from-red-400/10 via-red-400/4 to-black/16 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Careful actions</p>
              <div className="mt-5 space-y-3">
                {['Export your data', 'Clear session history', 'Remove private material permanently'].map((item) => (
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
