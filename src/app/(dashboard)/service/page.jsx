import homeUrl from "@/lib/homeUrl"
import ServiceClient from "./ServiceClient"
import { format } from "date-fns"
import { SERVICE_STATUS_OPTIONS } from "@/app/consts"

const getAllocations = async () => {
  const date = new Date()
  const dServiceDay = format(date, 'yyyy/MM/dd')
  const res = await fetch(homeUrl(`/api/service?d=${dServiceDay}`))
  const { data } = await res.json()
  return data
}

const getMechanics = async () => {
  const res = await fetch(homeUrl('/api/users?jabatan=teknisi'))
  const { data } = await res.json()
  return data
}

const getForemen = async () => {
  const res = await fetch(homeUrl('/api/users?jabatan=foreman'))
  const { data } = await res.json()
  return data
}

const getSA = async () => {
  const res = await fetch(homeUrl('/api/users?jabatan=sa'))
  const { data } = await res.json()
  return data
}

const getCars = async () => {
  const res = await fetch(homeUrl('/api/cars'))
  const { data } = await res.json()
  return data
}

const getStalls = async () => {
  const res = await fetch(homeUrl('/api/stalls'))
  const { data } = await res.json()
  return data
}

const getUserOptions = async () => {
  const saOptions = (await getSA())
    .map((user) => ({
      value: user.id_employee,
      label: user.nama,
    }))

  const foremanOptions = (await getForemen())
    .map((user) => ({
      value: user.id_employee,
      label: user.nama,
    }))

  const teknisiOptions = (await getMechanics())
    .map((user) => ({
      value: user.id_employee,
      label: user.nama,
    }))

  return {
    saOptions,
    foremanOptions,
    teknisiOptions,
  }
}

const getCarsOptions = async () => {
  const cars = await getCars()
  return cars.map((car) => ({
    value: car.id_mobil,
    label: car.nopol,
  }))
}

const getStallOptions = async () => {
  const stalls = await getStalls()
  return stalls.map((stall) => ({
    value: stall.id_stall,
    label: stall.nama_stall,
  }))
}

export default async function Service() {
  const dataStalls = await getStalls()
  const stallOptions = await getStallOptions()
  const usersOptions = await getUserOptions()
  const carsOptions = await getCarsOptions()
  const dataAllocations = await getAllocations()
  return (
    <ServiceClient
      dataStalls={dataStalls}
      stallOptions={stallOptions}
      usersOptions={usersOptions}
      carsOptions={carsOptions}
      statusOptions={SERVICE_STATUS_OPTIONS}
      dataAllocations={dataAllocations}
    />
  )
}

