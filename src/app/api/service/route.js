import { CAR_MODEL_LIST, HARIAN_TABLE_HEADER } from "@/app/consts"
import { calculateAverage, createCategorySummary, findMostFrequentElement, getMaxValue, getMinValue, validateConditions } from "@/app/helper"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { add, formatISO, isBefore, isValid } from "date-fns"
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
  const notExists = { value: undefined }
  const {
    id_booking,
    tgl_service,
    start_time,
    estimated_time,
    end_time,
    car: { value: id_mobil } = notExists,
    stall: { value: id_stall } = notExists,
    status: { value: status } = notExists,
    service_advisor: { value: service_advisor } = notExists,
    foreman: { value: foreman } = notExists,
    teknisi,
    kilometer,
    note,
  } = body

  const conditions = [
    { condition: !tgl_service  || !isValid(new Date(tgl_service)), message: 'Tanggal service tidak valid' },
    { condition: !start_time  || !isValid(new Date(start_time)), message: 'Waktu mulai tidak valid' },
    { condition: !estimated_time  || !isValid(new Date(estimated_time)), message: 'Waktu estimasi selesai tidak valid' },
    { condition: (status === 'finished' && !end_time) || (end_time && !isValid(new Date(end_time))), message: 'Waktu selesai tidak valid' },
    { condition: end_time && status !== 'finished', message: 'Status masih belum Selesai' },
    { condition: !id_mobil, message: 'Mobil tidak valid' },
    { condition: !id_stall, message: 'Stall tidak valid' },
    { condition: !status, message: 'Status tidak valid' },
    { condition: !service_advisor, message: 'Service Advisor tidak valid' },
    { condition: !foreman, message: 'Foreman tidak valid' },
    { condition: !teknisi || !Array.isArray(teknisi) || teknisi.length === 0, message: 'Teknisi tidak valid' },
    { condition: teknisi.length > 2, message: 'Maksimal 2 teknisi' },
    { condition: isBefore(new Date(estimated_time), new Date(start_time)), message: 'Waktu estimasi selesai tidak valid' },
    { condition: end_time && (isBefore(new Date(end_time), new Date(start_time))), message: 'Waktu selesai tidak valid' },
  ]
  
  const { error } = validateConditions(conditions)
  if (error) return NextResponse.json({ data: null, error })

  const supabase = createRouteHandlerClient({ cookies })
  const { data: dataService, error: errorService } = await supabase.from('service')
    .insert({
      // id_booking,
      id_mobil,
      id_stall,
      status,
      tgl_service,
      kilometer: kilometer === '' ? undefined : Number(kilometer),
      note,
      mulai: start_time,
      estimasi_waktu: estimated_time,
      selesai: end_time === '' ? undefined : end_time,
      service_advisor,
      foreman,
    })
    .select()
    .single()

  if (errorService) return NextResponse.json({ data: null, error: errorService.message })

  const teknisiService = teknisi?.map((entry) => ({
    id_service: dataService?.id_service,
    id_employee: entry?.value,
  }))

  const { data: listTeknisiService, error: errorListTeknisi } = await supabase
    .from('service_detail_teknisi')
    .insert(teknisiService)
    .select('id_employee')
  
  if (errorListTeknisi) return NextResponse.json({ data: null, error: errorListTeknisi.message })

  return NextResponse.json({
    data: {
      ...dataService,
      teknisi: listTeknisiService,
      message: 'Data berhasil ditambahkan'
    },
    error: null,
  })
}
