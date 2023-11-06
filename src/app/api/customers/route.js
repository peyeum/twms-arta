import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data, error } = await supabase.from('customers').select()
  return NextResponse.json({ data, error })
}

export async function POST(request) {
  const body = await request.json()
  const { nama, alamat } = body
  const supabase = createRouteHandlerClient({ cookies })

  const { data, error} = await supabase.from('customers')
    .insert({
      nama,
      alamat,
    })
    .select()
  return NextResponse.json({ data: 'Data berhasil ditambahkan', error: error?.message})
}
