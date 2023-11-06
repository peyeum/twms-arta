import { convertTimeToISOString } from "@/app/helper"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { add, formatISO } from "date-fns"
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

export async function GET(request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { nextUrl: { searchParams } } = request
  const bookingDate = searchParams.get('d')
  const bookingCount = searchParams.get('c')
  
  const serviceQuery = bookingCount === 'true'
    ? supabase.from('bookings').select('*', { count: 'exact', head: true })
    : supabase.from('bookings').select(GET_QUERY_STRING)

  const filters = []
  if (bookingDate) {
    filters.push(...getDateFilter(bookingDate))
  }

  const { data, count, error } = await filters
    .reduce(
      (acc, [filter, ...args]) => {
          return acc[filter](...args)
      },
      serviceQuery
    )

  return NextResponse.json({ data, count, error })
}

const getDateFilter = (serviceDate) => {
  const APPOINTMENT_COLUMN = 'appointment'
  const date = new Date(serviceDate)
  const startDate = formatISO(date)
  const endDate = formatISO(add(date, { hours: 23, minutes: 59, seconds: 59 }))

  return [[
    'gte',
    APPOINTMENT_COLUMN,
    startDate
  ], [
    'lte',
    APPOINTMENT_COLUMN,
    endDate
  ]]
}

export async function POST(request) {
  const body = await request.json()
  const {
    id_booking,
    appointment,
    car: { value: id_mobil },
    stall: { value: id_stall },
    status: { value: status },
    note,
  } = body
  const supabase = createRouteHandlerClient({ cookies })

  const { data: [ dataBookings ], error: errorBookings } = await supabase.from('bookings')
    .insert({
      id_mobil,
      id_stall,
      status,
      appointment,
      note,
    })
    .select()
  
  return NextResponse.json({
    data: !(errorBookings) ? {
      ...dataBookings,
      message: 'Data berhasil ditambahkan'
    } : undefined,
    error: errorBookings?.message
  })
}
