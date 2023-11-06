import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function PUT(request, { params }) {
  const id_customer = params.id
  const body = await request.json()
  const {
    nama,
    alamat,
  } = body
  const supabase = createRouteHandlerClient({ cookies })

  const { data, error } = await supabase.from('customers')
    .update({
      nama,
      alamat,
    })
    .eq('id_customer', id_customer)
    .select()

  return NextResponse.json({ data: 'Berhasil update data', error })
}

export async function DELETE(request, { params }) {
  // const id_stall = params.id
  const id_customer = params.id
  const supabase = createRouteHandlerClient({ cookies })
  
  const { error } = await supabase.from('customers')
    .delete()
    .eq('id_customer', id_customer)

  return NextResponse.json({ error })
}
