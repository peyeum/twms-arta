import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Sidebar from "./Sidebar"


const supabase = createServerComponentClient({cookies})

export default async function $Sidebar() {
  const { data: { user: { email }}, error: errorGetUser } = await supabase.auth.getUser()
  const { data: { username, role }, error: errorGetUsernames } = await supabase.from('usernames').select('username, role').eq('email', email).single()
  
  if (errorGetUser || errorGetUsernames) throw new Error('Error fetching user data')

  return <Sidebar username={username} role={role} />
}
