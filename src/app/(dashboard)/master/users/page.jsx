import homeUrl from "@/lib/homeUrl";
import UsersClient from "./UsersClient";
import { getAllUsers } from "./userersMockup";

const getUsers = async () => {
  const res = await fetch(homeUrl('/api/users'))
  const { data } = await res.json()
  return data
}

export default async function MasterDataUser() {
  const data = await getUsers()
  return (
    <UsersClient data={data} />
  )
}
