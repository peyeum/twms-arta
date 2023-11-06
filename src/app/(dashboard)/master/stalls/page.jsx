import React from 'react'
import StallsClient from './StallsClient'
import homeUrl from '@/lib/homeUrl'

const getMechanics = async () => {
  const res = await fetch(homeUrl('/api/users?jabatan=teknisi'))
  const { data } = await res.json()
  return data
}

const getOptions = async () => {
  const mechanics = await getMechanics()
  return mechanics.map((item) => ({
    value: item.id_employee,
    label: item.nama,
  }))
}

const getStallsWithPic = async () => {
  const res = await fetch(homeUrl('/api/stalls?with=pic'))
  const { data } = await res.json()
  return data
}

export default async function MasterDataStall() {
  const data = await getStallsWithPic()
  const options = await getOptions()
  return (
    <StallsClient data={data} options={options} />
  )
}
