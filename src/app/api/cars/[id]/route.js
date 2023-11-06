import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function PUT(request, { params }) {
  const id_mobil = params.id
  const body = await request.json()
  const {
    nopol,
    model,
    customer,
  } = body
  const supabase = createRouteHandlerClient({ cookies })

  const { data, error } = await supabase.from('cars')
    .update({
      nopol,
      model,
      id_customer: customer?.value,
    })
    .eq('id_mobil', id_mobil)
    .select()

  return NextResponse.json({ data: 'Berhasil update data', error })
}

export async function DELETE(request, { params }) {
  // const id_stall = params.id
  const id_mobil = params.id
  const supabase = createRouteHandlerClient({ cookies })
  
  const { error } = await supabase.from('cars')
    .delete()
    .eq('id_mobil', id_mobil)

  return NextResponse.json({ error })
}
