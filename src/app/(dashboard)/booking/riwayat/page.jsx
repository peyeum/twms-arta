import React from 'react'
import RiwayatClient from './RiwayatClient'
import { getOptionLabel } from '@/app/helper'
import homeUrl from '@/lib/homeUrl'
import { BOOKING_STATUS_OPTIONS } from '@/app/consts'

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

const getBookings = async () => {
  const res = await fetch(homeUrl(`/api/bookings`))
  const { data } = await res.json()
  return data
}

const getAllAllocationsComprehen = async ({
  stallOptions,
  carsOptions,
  statusOptions,
}) => {
  const allocations = await getBookings()
  const getCar = (value) => getOptionLabel(value, carsOptions)
  const getStatus = (value) => getOptionLabel(value, statusOptions)
  const getStall = (value) => getOptionLabel(value, stallOptions)

  return await allocations.map((allocation) => {
    const platnopol = getCar(allocation?.id_mobil)
    const nama_stall = getStall(allocation?.id_stall)
    const nama_status = getStatus(allocation?.status)
    return {
      ...allocation,
      platnopol,
      nama_stall,
      nama_status,
      tgl_booking: allocation.appointment,
    }
  })
}

export default async function RiwayatService() {
  const stallOptions = await getStallOptions()
  const carsOptions = await getCarsOptions()
  const dataAllocations = await getAllAllocationsComprehen({
    stallOptions,
    carsOptions,
    statusOptions,
  })
  return (
    <RiwayatClient
      stallOptions={stallOptions}
      carsOptions={carsOptions}
      statusOptions={BOOKING_STATUS_OPTIONS}
      data={dataAllocations}
    />
  )
}
