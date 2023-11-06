import React from 'react'
import RiwayatClient from './RiwayatClient'
import homeUrl from "@/lib/homeUrl"
import { getOptionLabel } from '@/app/helper'
import { SERVICE_STATUS_OPTIONS } from '@/app/consts'

const getAllocations = async () => {
  const res = await fetch(homeUrl('/api/service'))
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

const getAllAllocationsComprehen = async ({
  stallOptions,
  usersOptions,
  carsOptions,
  statusOptions,
}) => {
  const allocations = await getAllocations()
  const {
    saOptions,
    foremanOptions,
    teknisiOptions,
  } = usersOptions

  const getSa = (value) => getOptionLabel(value, saOptions)
  const getForeman = (value) => getOptionLabel(value, foremanOptions)
  const getTeknisi = (value) => getOptionLabel(value, teknisiOptions)
  const getCar = (value) => getOptionLabel(value, carsOptions)
  const getStatus = (value) => getOptionLabel(value, statusOptions)
  const getStall = (value) => getOptionLabel(value, stallOptions)

  return allocations.map((allocation) => {
    const platnopol = getCar(allocation?.id_mobil)
    const nama_stall = getStall(allocation?.id_stall)
    const nama_status = getStatus(allocation?.status)
    const nama_sa = getSa(allocation?.service_advisor)
    const nama_foreman = getForeman(allocation?.foreman)
    const nama_teknisi = allocation?.teknisi
      .map((entry) => getTeknisi(entry?.id_employee))
      .join(' - ')
    const { model: car_model } = allocation?.cars
    return {
      ...allocation,
      platnopol,
      car_model,
      nama_stall,
      nama_status,
      nama_sa,
      nama_foreman,
      nama_teknisi,
    }
  })
}

const getStallOptions = async () => {
  const stalls = await getStalls()
  return stalls.map((stall) => ({
    value: stall.id_stall,
    label: stall.nama_stall,
  }))
}

export default async function RiwayatService() {
  const stallOptions = await getStallOptions()
  const usersOptions = await getUserOptions()
  const carsOptions = await getCarsOptions()
  const dataAllocations = await getAllAllocationsComprehen({
    stallOptions,
    usersOptions,
    carsOptions,
    statusOptions,
  })
  return (
    <RiwayatClient
      stallOptions={stallOptions}
      usersOptions={usersOptions}
      carsOptions={carsOptions}
      statusOptions={SERVICE_STATUS_OPTIONS}
      data={dataAllocations}
    />
  )
}
