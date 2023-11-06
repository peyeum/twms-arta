import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  const body = await request.json()
  const username = body.username
  const password = body.password
  'RhkBaD@wTFW58FG'
  const supabase = createRouteHandlerClient({ cookies })
  const { data: [{email}] } = await supabase
    .from('usernames')
    .select('email')
    .eq('username', username)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return NextResponse.json({ data, error })
}
