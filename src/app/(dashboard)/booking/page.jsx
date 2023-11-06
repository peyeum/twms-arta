import { addDays, format, getHours } from 'date-fns'
import BookingClient from './BookingClient'
import homeUrl from '@/lib/homeUrl'
import { BOOKING_STATUS_OPTIONS } from '@/app/consts'

const TODAY_LIMIT_BOOKING_HOUR = 15

const getMechanics = async () => {
  const res = await fetch(homeUrl('/api/users?jabatan=teknisi'))
  const { data } = await res.json()
  return data
}

const getStalls = async () => {
  const res = await fetch(homeUrl('/api/stalls'))
  const { data } = await res.json()
  return data
}

const getCars = async () => {
  const res = await fetch(homeUrl('/api/cars'))
  const { data } = await res.json()
  return data
}

const getTodaysBookings = async () => {
  const today = new Date()
  const tomorrow = addDays(today, 1)
  const dBookingDay = format(
    getHours(new Date()) >= TODAY_LIMIT_BOOKING_HOUR ? tomorrow : today,
    'yyyy/MM/dd'
  )
  const res = await fetch(homeUrl(`/api/bookings?d=${dBookingDay}`))
  const { data } = await res.json()
  return data
}

const getTeknisiOptions = async () => {
  const mechanics = await getMechanics()
  return mechanics.map((user) => ({
      value: user.id_employee,
      label: user.nama,
    }))
}

const getCarsOptions = async () => {
  const cars = await getCars()
  return cars.map((car) => ({
    value: car.id_mobil,
    label: car.nopol,
  }))
}

const getStallOptions = async (stalls) => {
  return stalls.map((stall) => ({
    value: stall.id_stall,
    label: stall.nama_stall,
  }))
}

export default async function Booking() {
  const dataStalls = await getStalls()
  const stallOptions = await getStallOptions(dataStalls)
  const carsOptions = await getCarsOptions()
  const mechanicsOptions = await getTeknisiOptions()
  const dataAllocations = await getTodaysBookings()
  return (
    <BookingClient
      dataStalls={dataStalls}
      stallOptions={stallOptions}
      usersOptions={mechanicsOptions}
      carsOptions={carsOptions}
      statusOptions={BOOKING_STATUS_OPTIONS}
      dataAllocations={dataAllocations}
    />
  )
}
