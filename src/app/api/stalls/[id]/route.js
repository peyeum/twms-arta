import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function PUT(request, { params }) {
  const id_stall = params.id
  const body = await request.json()
  const {
    nama_stall,
    status,
    user,
  } = body
  const supabase = createRouteHandlerClient({ cookies })
  let newStatus = status
  if (!['tersedia', 'sibuk'].includes(status)) {
    newStatus = 'tersedia'
  }
  const { data, error } = await supabase.from('stalls')
    .update({
      nama_stall,
      status: newStatus,
    })
    .eq('id_stall', id_stall)
    .select()
  return NextResponse.json({ data: 'Berhasil update data', error })
}

export async function DELETE(request, { params }) {
  const id_stall = params.id
  const supabase = createRouteHandlerClient({ cookies })
  
  const { error } = await supabase.from('stalls')
    .delete()
    .eq('id_stall', id_stall)

  return NextResponse.json({ error })
}
