import DashboardClient from './DashboardClient'
import tryFetch from '@/lib/tryFetch'
import homeUrl from '@/lib/homeUrl'
import { format, getDate, getDay, getMonth, getYear, intlFormat, isToday } from 'date-fns'


const DAY_NAME_INDEX = new Map([
  [0, 'Minggu'],
  [1, 'Senin'],
  [2, 'Selasa'],
  [3, 'Rabu'],
  [4, 'Kamis'],
  [5, 'Jumat'],
  [6, 'Sabtu'],
])

const getLastSevenDaysServicesSum = async () => {
  const today = new Date()
  const year = getYear(today)
  const month = getMonth(today)
  const date = getDate(today)
  const lastSevenDaysServicesSumArray = []
  const lastSevenDaysArray = Array.from({ length: 7 }, (_, i) => 
    new Date(year, month, date - ( 6 - i ) ))
  
  for await (const day of lastSevenDaysArray) {
    const dayServicesSum = await getDayServicesSum(day)
    const dayIndex = getDay(day)
    lastSevenDaysServicesSumArray.push({
      unit: dayServicesSum,
      name: isToday(day)
        ? 'Hari ini'
        : DAY_NAME_INDEX.get(dayIndex),
    })
    // lastSevenDaysServicesSumArray.push({
    //   date: dayDateString,
    //   sum: dayServicesSum,
    //   day: DAY_NAME_INDEX.get(dayIndex),
    // })
  }

  return lastSevenDaysServicesSumArray
}

const getDayServicesSum = async (date) => {
  const dDay = format(date, 'yyyy/MM/dd')
  const { count, error } = await tryFetch(homeUrl(`/api/service?d=${dDay}&c=true`))

  if (error) console.error(error)
  return count
}

const getDayBookingsSum = async (date) => {
  const dDay = format(date, 'yyyy/MM/dd')
  const { count, error } = await tryFetch(homeUrl(`/api/bookings?d=${dDay}&c=true`))

  if (error) console.error(error)
  return count
}

const getTodayAllocationsSum = async () => {
  const date = new Date()
  const allocations = await getDayServices(date)
  const qsSum = allocations.filter((allocation) => allocation.id_stall
    .includes('qs'))
    .length

  const pmSum = allocations.filter((allocation) => allocation.id_stall
    .includes('pm'))
    .length

  const grSum = allocations.filter((allocation) => allocation.id_stall
    .includes('gr'))
    .length

  return [
    {
      name: 'Quick Service',
      value: qsSum,
    },
    {
      name: 'Periodical Maintenance',
      value: pmSum,
    },
    {
      name: 'General Repair',
      value: grSum,
    },
  ]
}

const getDayServices = async (date) => {
  const dDay = format(date, 'yyyy/MM/dd')
  const { data, error } = await tryFetch(homeUrl(`/api/service?d=${dDay}`))

  if (error) console.error(error)
  return data
}

const getTodaySum = (lastSevenDaysServices, todayBookingSum) => {
  const today = intlFormat(new Date(), { dateStyle: 'full', timeZone: 'Asia/Jakarta' }, { locale: 'id-ID' })
  const todaySum = lastSevenDaysServices.find((day) => day.name === 'Hari ini')

  return {
    label: today,
    text: [
      `Unit Service : ${todaySum?.unit} Unit`,
      `Unit Booking : ${todayBookingSum} Unit`,
    ],
    helper: `Mengalami ${
      todaySum?.unit > lastSevenDaysServices.at(-2)?.unit
        ? 'kenaikan'
        : 'penurunan'
    } unit dari hari sebelumnya `,
    arrow: todaySum.unit > lastSevenDaysServices.at(-2).unit
      ? 'increase'
      : 'decrease',
  }
}

export default async function Dashboard() {
  const lastSevenDayServicesSum = await getLastSevenDaysServicesSum()
  const todayAllocationsSum = await getTodayAllocationsSum()
  const todayBookingSum = await getDayBookingsSum(new Date())
  const dataUnitList = [
    getTodaySum(lastSevenDayServicesSum, todayBookingSum),
    {
      label: 'Unit Service',
      text: todayAllocationsSum.map((entry) => `${entry.name} : ${entry.value} Unit`),
    },
  ]
  return (
    <DashboardClient
      lastSevenDayServicesSum={lastSevenDayServicesSum}
      todayAllocationsSum={todayAllocationsSum}
      dataUnitList={dataUnitList}
    />
  )
}
