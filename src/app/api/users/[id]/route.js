import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function PUT(request, { params }) {
  // const id_stall = params.id
  const id_employee = params.id
  const body = await request.json()
  const {
    nama,
    jabatan,
  } = body
  const supabase = createRouteHandlerClient({ cookies })

  const listJabatan = ['Service Advisor', 'Foreman', 'Teknisi',]
  let newJabatan = jabatan
  if (!listJabatan.includes(jabatan)) {
    newJabatan = listJabatan.at(-1)
  }

  const { data, error } = await supabase.from('employees')
    .update({
      nama,
      jabatan: newJabatan,
    })
    .eq('id_employee', id_employee)
    .select()

  return NextResponse.json({ data: 'Berhasil update data', error })
}

export async function DELETE(request, { params }) {
  // const id_stall = params.id
  const id_employee = params.id
  const supabase = createRouteHandlerClient({ cookies })
  
  const { error } = await supabase.from('employees')
    .delete()
    .eq('id_employee', id_employee)

  return NextResponse.json({ error })
}
