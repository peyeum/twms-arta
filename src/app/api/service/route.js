import { CAR_MODEL_LIST, HARIAN_TABLE_HEADER } from "@/app/consts"
import { calculateAverage, convertTimeToISOString, createCategorySummary, findMostFrequentElement, getMaxValue, getMinValue } from "@/app/helper"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { add, formatISO, isBefore } from "date-fns"
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

export async function GET(request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { nextUrl: { searchParams } } = request
  const serviceDate = searchParams.get('d')
  const serviceCount = searchParams.get('c')
  const serviceReport = searchParams.get('r')
  const serviceReportRange = searchParams.get('rr')
  
  const serviceQuery = serviceCount === 'true'
    ? supabase.from('service').select('*', { count: 'exact', head: true })
    : supabase.from('service').select(GET_QUERY_STRING)

  if (serviceReport === 'true') {
    const report = await handleServiceReport(serviceQuery, { range: serviceReportRange, date: serviceDate})
    return NextResponse.json(report)
  }

  const filters = []
  if (serviceDate) {
    filters.push(...getDateFilter(serviceDate))
  }
  const { data, count, error } = await dbQuery(serviceQuery, filters)
  return NextResponse.json({ data, count, error })  
}

const dbQuery = async (query, filters) => await filters
  .reduce(
    (acc, [filter, ...args]) => {
      return acc[filter](...args)
    },
    query
  )

const getDateFilter = (serviceDate) => {
  const TGL_SERVICE_COLUMN = 'tgl_service'
  const date = new Date(serviceDate)
  const startDate = formatISO(date)
  const endDate = formatISO(add(date, { hours: 23, minutes: 59, seconds: 59 }))

  return [[
    'gte',
    TGL_SERVICE_COLUMN,
    startDate
  ], [
    'lte',
    TGL_SERVICE_COLUMN,
    endDate
  ]]
}

// const handleServiceReport = async (query, range) => {
const handleServiceReport = async (query, { range, date }) => {
  const RANGE_INDEX = ['harian', 'bulanan', 'overall']
  const filters = []

  if (!RANGE_INDEX.at(Number(range))) return { data: null, error: 'Range tidak valid' }

  if (RANGE_INDEX.at(Number(range)) === 'harian') {
    filters.push(...getDateFilter(date))
    const { data, error } = await dbQuery(query, filters)
    const report = handleHarainReport(data)
    return { report, error: null }
  }

  return { data: 'hello world', error: null }
}

const createDailyJobSummary = ( data ) => {
  const qsAllocations = data.filter((entry) => entry?.id_stall.includes('qs'))
  const pmAllocations = data.filter((entry) => entry?.id_stall.includes('pm'))
  const grAllocations = data.filter((entry) => entry?.id_stall.includes('gr'))
  const allocations = data

  const pekerjaanArray = [ allocations, qsAllocations, pmAllocations, grAllocations ]

  const durations = pekerjaanArray.map((pekerjaan) => {
    return pekerjaan.map((entry) => {
        const { mulai, selesai } = entry
        const durasiService = /* result in minutes */ (new Date(selesai) - new Date(mulai)) / 1000 / 60
        return durasiService
      })
  })

  const estimasiSesuai = pekerjaanArray.map((pekerjaan) => {
    return pekerjaan.map((entry) => {
      const { estimasi_waktu, selesai } = entry
      const estimasiSesuai = isBefore(new Date(selesai), new Date(estimasi_waktu))
      return estimasiSesuai
    })
  })

  const modelMobil = pekerjaanArray.map((pekerjaan) => {
    return pekerjaan
      .map(({ cars: { model }}) => CAR_MODEL_LIST.find((name) => model.toLowerCase().includes(name)))
  })

  const unitMasuk = createCategorySummary(
    'Unit Masuk',
    pekerjaanArray.map((entry) => entry.length + ' unit')
  )

  const estimasiServiceTimeTerpenuhi = createCategorySummary(
    'Estimasi Service Time Terpenuhi',
    estimasiSesuai.map((entry) => entry.filter((entry) => entry).length + ' unit')
  )

  const minDurations = createCategorySummary(
    'Durasi service tercepat',
    durations.map((entry) => getMinValue(entry) + ' menit')
  )

  const avgDurations = createCategorySummary(
    'Durasi service rata-rata',
    durations.map((entry) => calculateAverage(entry) + ' menit')
  )

  const maxDurations = createCategorySummary(
    'Durasi service terlama',
    durations.map((entry) => getMaxValue(entry) + ' menit')
  )

  const modelMobilTerbanyak = createCategorySummary(
    'Model unit terbanyak',
    modelMobil.map((entry) => findMostFrequentElement(entry).join(' - ').toUpperCase())
  )

  return [
    unitMasuk,
    estimasiServiceTimeTerpenuhi, 
    minDurations,
    avgDurations,
    maxDurations,
    modelMobilTerbanyak,
  ]
}

const handleHarainReport = (data) =>  {
  const finishedAllocations = data?.filter((entry) => entry?.status === 'finished')
  return {
    data: createDailyJobSummary(finishedAllocations),
    header: HARIAN_TABLE_HEADER,
  }
}

export async function POST(request) {
  const body = await request.json()
  const {
    id_booking,
    tgl_service,
    start_time,
    estimated_time,
    end_time,
    car: { value: id_mobil },
    stall: { value: id_stall },
    status: { value: status },
    service_advisor: { value: service_advisor },
    foreman: { value: foreman },
    teknisi,
    kilometer,
    note,
  } = body
  const supabase = createRouteHandlerClient({ cookies })

  const startTimeIso = convertTimeToISOString(start_time, tgl_service) ?? null
  const estimatedTimeIso = convertTimeToISOString(estimated_time, tgl_service) ?? null
  const endTimeIso = convertTimeToISOString(end_time, tgl_service) ?? null

  const { data: [ dataService ], error: errorService } = await supabase.from('service')
    .insert({
      // id_booking,
      id_mobil,
      id_stall,
      status,
      tgl_service,
      kilometer,
      note,
      mulai: startTimeIso,
      estimasi_waktu: estimatedTimeIso,
      selesai: endTimeIso,
      service_advisor,
      foreman,
    })
    .select()
  
  const teknisiService = teknisi?.map((entry) => ({
    id_service: dataService?.id_service,
    id_employee: entry?.value,
  }))

  const { data: listTeknisiService, error: errorListTeknisi } = await supabase
    .from('service_detail_teknisi')
    .insert(teknisiService)
    .select('id_employee')

  return NextResponse.json({
    data: !(errorService ?? errorListTeknisi) ? {
      ...dataService,
      teknisi: listTeknisiService,
      message: 'Data berhasil ditambahkan'
    } : undefined,
    error: errorService?.message ?? errorListTeknisi?.message
  })
}
