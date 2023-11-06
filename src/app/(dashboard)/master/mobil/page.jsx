import MobilClient from './MobilClient'
import homeUrl from '@/lib/homeUrl'

const getAllCustomers = async () => {
  const res = await fetch(homeUrl('/api/customers'))
  const { data } = await res.json()
  return data
}

const getOptions = async () => {
  const data = await getAllCustomers()
  return data.map((item) => ({
    value: item.id_customer,
    label: item.nama,
  }))
}

const getCarsWithCustomer = async () => {
  const res = await fetch(homeUrl('/api/cars?with=customers'))
  const { data } = await res.json()
  return data
}

export default async function MasterDataMobil() {
  const data = await getCarsWithCustomer()
  const options = await getOptions()
  return (
    <MobilClient data={data} options={options} />
  )
}
