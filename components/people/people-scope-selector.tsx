'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { PersonRosterRecord } from '@/lib/workspace/contracts'

export function PeopleScopeSelector() {
  const [roster, setRoster] = useState<PersonRosterRecord[]>([])
  const [selected, setSelected] = useState<string>('')

  useEffect(() => {
    let active = true

    void (async () => {
      try {
        const response = await fetch('/api/people/roster', { cache: 'no-store' })
        if (!response.ok) return
        const data = (await response.json()) as PersonRosterRecord[]
        if (!active) return
        setRoster(data)
        if (data.length > 0) {
          setSelected(data[0].id)
        }
      } catch {
        // keep silent in dashboard scaffold
      }
    })()

    return () => {
      active = false
    }
  }, [])

  const workspaceHref = useMemo(
    () => (selected ? `/workspace?personId=${selected}` : '/workspace'),
    [selected]
  )

  return (
    <section className="p-5 rounded-xl bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 space-y-3">
      <div>
        <p className="text-sm font-bold text-foreground tracking-tight">People Scope</p>
        <p className="text-xs text-muted-foreground/70 font-light mt-1">
          Session scope uses saved people roster records by role and name.
        </p>
      </div>

      <select
        className="w-full h-9 rounded border border-border/40 bg-background px-2 text-sm"
        value={selected}
        onChange={(event) => setSelected(event.target.value)}
      >
        <option value="">Select person scope</option>
        {roster.map((person) => (
          <option key={person.id} value={person.id}>
            {person.role}: {person.name}
          </option>
        ))}
      </select>

      <Button asChild size="sm" className="w-full">
        <Link href={workspaceHref}>Open Workspace With Scope</Link>
      </Button>
    </section>
  )
}
