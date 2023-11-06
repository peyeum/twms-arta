import CustomerClient from "./CustomersClient";
import homeUrl from "@/lib/homeUrl";

const getAllCustomers = async () => {
  const res = await fetch(homeUrl('/api/customers'))
  const { data } = await res.json()
  return data
}

export default async function MasterDataCustomer() {
  const data = await getAllCustomers()
  return (
    <CustomerClient data={data} />
  )
}
