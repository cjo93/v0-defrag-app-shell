import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserProfile } from '@/lib/supabase/profile'

export async function GET(req: NextRequest) {
  const profile = await getCurrentUserProfile()
  if (!profile) {
    return NextResponse.json({}, { status: 401 })
  }
  return NextResponse.json(profile)
}

