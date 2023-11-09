import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Sidebar from "./Sidebar"
import { redirect } from "next/navigation"


const supabase = createServerComponentClient({cookies})

export default async function $Sidebar() {
  const { data: { user }, error: errorGetUser } = await supabase.auth.getUser()
  const { email } = user ?? { email: undefined }
  
  if (!email || errorGetUser) return redirect('/auth/logout')

  const { data: { username, role }, error: errorGetUsernames } = await supabase.from('usernames').select('username, role').eq('email', email).single()
  
  if (!username || !role || errorGetUsernames) redirect('/auth/logout')

  return <Sidebar username={username} role={role} />
}
