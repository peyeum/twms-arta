import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export const dynamic = 'force-dynamic'

export async function GET(request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { nextUrl: {searchParams} } = request
  // const searchWith = searchParams.get('with')?.toString()?.toLoweCase()
  const searchWith = searchParams.get('with')
  
  switch (searchWith) {
    case 'customers': {
      const { data, error } = await getCarsWithCustomer(supabase)
      return NextResponse.json({ data, error })
    }
  
    default: {
      const { data, error } = await getCars(supabase)
      return NextResponse.json({ data , error })  
    }
  }
}

export async function POST(request) {
  const body = await request.json()
  const {
    nopol,
    model,
    customer,
  } = body
  const supabase = createRouteHandlerClient({ cookies })

  const { data, error } = await supabase.from('cars')
    .insert({
      nopol,
      model,
      id_customer: customer?.value ?? undefined,
    })
    .select()
  return NextResponse.json({
    data,
    error: error?.message
  })
}

const getCars = async (supabase) => {
  const { data, error } = await supabase
    .from('cars')
    .select('id_mobil, nopol, model')
  return { data , error }
}

const getCarsWithCustomer = async (supabase) => {
  const { data, error } = await supabase
    .from('cars')
    .select(`
      id_mobil,
      nopol,
      model,
      customers (id_customer, nama)
    `)
  const carsWithCus = data.map(({
    id_mobil,
    model,
    nopol,
    customers = {},
  }) => ({
      id_mobil,
      model,
      nopol,
      id_customer: customers?.id_customer,
      nama_customer: customers?.nama,
    }))
  return { data: carsWithCus, error }
}