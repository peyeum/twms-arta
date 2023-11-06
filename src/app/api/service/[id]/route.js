import { convertTimeToISOString } from "@/app/helper"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

const GET_QUERY_STRING = `
  id_service,
  id_booking,
  id_mobil,
  id_stall,
  status,
  tgl_service,
  kilometer,
  note,
  mulai,
  estimasi_waktu,
  selesai,
  service_advisor,
  foreman,
  teknisi:service_detail_teknisi (
    id_employee
  ),
  cars (
    model
  )
`

export async function GET(request, { params }) {
  const supabase = createRouteHandlerClient({ cookies })
  const id_service = params.id
  
  const { data, error } = await supabase.from('service')
    .select(GET_QUERY_STRING)
    .eq('id_service', id_service)
    .single()

  return NextResponse.json({ data , error })  
}

export async function PUT(request, { params }) {
  const id_service = params.id
  const body = await request.json()
  const notExists = { value: undefined }
  const {
    id_booking,
    tgl_service,
    start_time,
    estimated_time,
    end_time,
    kilometer,
    note,
    car: { value: id_mobil } = notExists,
    stall: { value: id_stall } = notExists,
    status: { value: status } = notExists,
    service_advisor: { value: service_advisor } = notExists,
    foreman: { value: foreman } = notExists,
    teknisi,
  } = body
  
  const startTimeIso = (start_time && tgl_service) ? convertTimeToISOString(start_time, tgl_service) : undefined

  const estimatedTimeIso = (estimated_time && tgl_service) ? convertTimeToISOString(estimated_time, tgl_service) : undefined

  const endTimeIso = (end_time && tgl_service) ? convertTimeToISOString(end_time, tgl_service) : undefined
  
  const supabase = createRouteHandlerClient({ cookies })
  if (
    id_booking ||
    id_mobil ||
    id_stall ||
    status ||
    kilometer ||
    note ||
    service_advisor ||
    foreman ||
    tgl_service
  ) {
    const { error } = await supabase.from('service')
      .update({
        ...(id_booking && { id_booking } ),
        ...(id_mobil && { id_mobil } ),
        ...(id_stall && { id_stall } ),
        ...(status && { status } ),
        ...(kilometer && { kilometer } ),
        ...(note && { note } ),
        ...(service_advisor && { service_advisor } ),
        ...(foreman && { foreman } ),
        ...(tgl_service && { tgl_service } ),
        ...(start_time && { mulai: startTimeIso } ),
        ...(estimated_time && { estimasi_waktu: estimatedTimeIso } ),
        ...(end_time && { selesai: endTimeIso } ),
      })
      .eq('id_service', id_service)
    
    if ( error ) return NextResponse.json({ data: null, error: error.message })
  }
  
  if ( teknisi?.length > 0 ) {
    const { error: errorDelete } = await supabase.from('service_detail_teknisi')
      .delete()
      .eq('id_service', id_service)
    
    if ( errorDelete ) return NextResponse.json({ data: null, error: errorDelete.message })
    
    const teknisiService = teknisi?.map((entry) => ({
      id_service: id_service,
      id_employee: entry?.value,
    }))
    
    const { error } = await supabase
      .from('service_detail_teknisi')
      .insert(teknisiService)
    
    if ( error ) return NextResponse.json({ data: null, error: error.message })
  }

  return NextResponse.json({ data: {message: 'Berhasil update data'}, error: null })
}

export async function DELETE(request, { params }) {
  const id_service = params.id
  const supabase = createRouteHandlerClient({ cookies })
  
  const { error } = await supabase.from('service')
    .delete()
    .eq('id_service', id_service)

  return NextResponse.json({ error })
}
