import { convertTimeToISOString } from "@/app/helper"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

const GET_QUERY_STRING = `
  id_booking,
  id_stall,
  id_mobil,
  appointment,
  status,
  note,
  car:cars (
    model
  )
`

export async function GET(request, { params }) {
  const supabase = createRouteHandlerClient({ cookies })
  const id_booking = params.id
  
  const { data, error } = await supabase.from('bookings')
    .select(GET_QUERY_STRING)
    .eq('id_booking', id_booking)
    .single()

  return NextResponse.json({ data , error })  
}

export async function PUT(request, { params }) {
  const id_booking = params.id
  const body = await request.json()
  const notExists = { value: undefined }
  const {
    appointment,
    note,
    car: { value: id_mobil } = notExists,
    stall: { value: id_stall } = notExists,
    status: { value: status } = notExists,
  } = body
  
  const supabase = createRouteHandlerClient({ cookies })
  // if (
  //   id_mobil ||
  //   id_stall ||
  //   status ||
  //   note ||
  //   appointment
  // ) {
  // }
  const { error } = await supabase.from('bookings')
    .update({
      ...(id_mobil && { id_mobil } ),
      ...(id_stall && { id_stall } ),
      ...(status && { status } ),
      ...(note && { note } ),
      ...(appointment && { appointment } ),
    })
    .eq('id_booking', id_booking)

  if ( error ) return NextResponse.json({ data: null, error: error.message })

  return NextResponse.json({ data: {message: 'Berhasil update data'}, error: null })
}

export async function DELETE(request, { params }) {
  const id_booking = params.id
  const supabase = createRouteHandlerClient({ cookies })
  
  const { error } = await supabase.from('bookings')
    .delete()
    .eq('id_booking', id_booking)

  return NextResponse.json({ error })
}
