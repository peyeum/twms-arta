import { convertTimeToISOString, isEmptyObject, validateConditions } from "@/app/helper"
import { add, formatISO, isBefore, isValid } from "date-fns"
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

  return NextResponse.json({ data, error })
}

export async function PUT(request, { params }) {
  const id_service = params.id
  const body = await request.json()

  if (isEmptyObject(body)) return NextResponse.json({ data: null, error: 'Tidak Ada Perubahan Data' })

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

  const conditions = [
    { condition: tgl_service && !isValid(new Date(tgl_service)), message: 'Tanggal service tidak valid' },
    { condition: start_time && !isValid(new Date(start_time)), message: 'Waktu mulai tidak valid' },
    { condition: estimated_time && !isValid(new Date(estimated_time)), message: 'Waktu estimasi selesai tidak valid' },
    { condition: (end_time && !isValid(new Date(end_time))), message: 'Waktu selesai tidak valid' },
    { condition: teknisi && !Array.isArray(teknisi) || teknisi?.length === 0, message: 'Teknisi tidak valid' },
    { condition: teknisi && teknisi?.length > 2, message: 'Maksimal 2 teknisi' },
    { condition: status === 'finished' && !end_time, message: 'Waktu selesai belum diatur' }
  ]

  const { error } = validateConditions(conditions)
  if (error) return NextResponse.json({ data: null, error })

  const supabase = createRouteHandlerClient({ cookies })
  if (estimated_time || end_time) {
    const { data: { mulai }, error: errorStartTime } = await supabase.from('service')
      .select('mulai')
      .eq('id_service', id_service)
      .single()

    if (errorStartTime) return NextResponse.json({ data: null, error: errorStartTime.message })

    const startTime = new Date(mulai)

    const conditions = [
      { condition: estimated_time && (isBefore(new Date(estimated_time), startTime)), message: 'Waktu estimasi selesai tidak valid' },
      { condition: end_time && end_time !== '' && (isBefore(new Date(end_time), startTime)), message: 'Waktu selesai tidak valid' },
      { condition: end_time && end_time !== '' && status !== 'finished' || !status, message: 'Status masih belum Selesai' },
    ]

    const { error: validationError } = validateConditions(conditions)
    if (validationError) return NextResponse.json({ data: null, error: validationError })
  }

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
        ...(id_booking && { id_booking }),
        ...(id_mobil && { id_mobil }),
        ...(id_stall && { id_stall }),
        ...(status && { status }),
        ...(kilometer !== '' && { kilometer: Number(kilometer) }),
        ...(note && { note }),
        ...(service_advisor && { service_advisor }),
        ...(foreman && { foreman }),
        ...(tgl_service && { tgl_service }),
        ...(start_time && { mulai: start_time }),
        ...(estimated_time && { estimasi_waktu: estimated_time }),
        ...(end_time && { selesai: end_time }),
      })
      .eq('id_service', id_service)

    if (error) return NextResponse.json({ data: null, error: error.message })
  }

  if (teknisi?.length > 0) {
    const { error: errorDelete } = await supabase.from('service_detail_teknisi')
      .delete()
      .eq('id_service', id_service)

    if (errorDelete) return NextResponse.json({ data: null, error: errorDelete.message })

    const teknisiService = teknisi?.map((entry) => ({
      id_service: id_service,
      id_employee: entry?.value,
    }))

    const { error } = await supabase
      .from('service_detail_teknisi')
      .insert(teknisiService)

    if (error) return NextResponse.json({ data: null, error: error.message })
  }

  return NextResponse.json({ data: { message: 'Berhasil update data' }, error: null })
}

export async function DELETE(request, { params }) {
  const id_service = params.id
  const supabase = createRouteHandlerClient({ cookies })

  const { error } = await supabase.from('service')
    .delete()
    .eq('id_service', id_service)

  return NextResponse.json({ error })
}
