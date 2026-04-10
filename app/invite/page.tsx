'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function InvitePage() {
  const [relationship, setRelationship] = useState('Partner')

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(135,89,255,0.14),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(94,234,212,0.08),transparent_22%),linear-gradient(180deg,#05060a_0%,#080a11_42%,#05060a_100%)] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">Invite and privacy</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-[-0.05em] text-white/92 sm:text-4xl">Invite someone in without losing clarity or trust.</h1>
          </div>
          <Link href="/dashboard" className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/72 transition hover:border-white/16 hover:bg-white/[0.08] hover:text-white">
            Back
          </Link>
        </div>

        <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Relationship overlay</p>
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/82">Who are you inviting?</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-sm text-white outline-none"
                >
                  <option>Partner</option>
                  <option>Family member</option>
                  <option>Friend</option>
                  <option>Co-parent</option>
                  <option>Collaborator</option>
                </select>
              </div>

              <div className="rounded-2xl border border-white/8 bg-black/18 p-4">
                <p className="text-sm font-semibold text-white/86">What they see</p>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  A focused, respectful view of the shared moment, the invitation context, and any overlay you choose to share.
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-black/18 p-4">
                <p className="text-sm font-semibold text-white/86">What stays private</p>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  Your full workspace history, hidden notes, and any layers you have not explicitly included in the invite.
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-black/18 p-4">
                <p className="text-sm font-semibold text-white/86">Tone of the shared view</p>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  The invite should feel respectful and explicit, not clinical or ambiguous about what is being shared.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-primary/16 bg-gradient-to-br from-primary/12 via-primary/6 to-black/16 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Trust signals</p>
            <div className="mt-5 grid gap-3">
              {[
                'The invite flow should feel calm, explicit, and reversible.',
                'Privacy language stays plain: what is shared, what is hidden, and who can see it.',
                'Relationship overlays should add context, not create confusion or expose more than intended.',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-black/18 px-4 py-4 text-sm leading-6 text-white/72">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/92">
                Generate invite link
              </button>
              <button className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-6 text-sm font-semibold text-white/80 transition hover:border-white/16 hover:bg-white/[0.08] hover:text-white">
                Preview shared view
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
