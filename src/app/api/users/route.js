import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { nextUrl: {searchParams} } = request
  // const searchWith = searchParams.get('with')?.toString()?.toLowerCase()
  const searchWith = searchParams.get('jabatan')
  
  switch (searchWith) {
    case 'teknisi': {
      const { data, error } = await getMechanics(supabase)
      return NextResponse.json({ data, error })
    }

    case 'foreman': {
      const { data, error } = await getForemen(supabase)
      return NextResponse.json({ data, error })
    }
    
    case 'sa': {
      const { data, error } = await getSA(supabase)
      return NextResponse.json({ data, error })
    }
  
    default: {
      const { data, error } = await getEmployees(supabase)
      return NextResponse.json({ data , error })  
    }
  }
}

export async function POST(request) {
  const body = await request.json()
  const { nama, jabatan } = body
  const supabase = createRouteHandlerClient({ cookies })

  const listJabatan = ['Service Advisor', 'Foreman', 'Teknisi',]
  let newJabatan = jabatan
  if (!listJabatan.includes(jabatan)) {
    newJabatan = listJabatan.at(-1)
  }

  const { data, error} = await supabase.from('employees')
    .insert({
      nama,
      jabatan: newJabatan
    })
    .select()
  return NextResponse.json({ data: 'Data berhasil ditambahkan', error: error?.message})
}

const getEmployees = async (supabase) => await supabase.from('employees').select()

const getMechanics = async (supabase) => await supabase.from('employees').select()
  .eq('jabatan', 'Teknisi')

const getForemen = async (supabase) => await supabase.from('employees').select()
  .eq('jabatan', 'Foreman')
  
const getSA = async (supabase) => await supabase.from('employees').select()
    .eq('jabatan', 'Service Advisor')

