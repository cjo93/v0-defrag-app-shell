'use client'

import { WorkspaceLayout } from '@/components/workspace/workspace-layout'
import { useSearchParams } from 'next/navigation'

export default function WorkspacePage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  return <WorkspaceLayout workspaceId={id || undefined} />
}
