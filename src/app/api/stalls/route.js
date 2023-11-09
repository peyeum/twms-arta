import { frtStallId, sortStalls } from "@/app/helper"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { nextUrl: { searchParams } } = request
  const searchWith = searchParams.get('with')

  switch (searchWith) {
    case 'pic': {
      const { data, error } = await getStallsWithPic(supabase)
      return NextResponse.json({ data, error })
    }

    default: {
      const { data, error } = await getStalls(supabase)
      const sortedData = sortStalls(data)
      return NextResponse.json({ data: sortedData, error })
    }
  }
}

export async function POST(request) {
  const body = await request.json()
  const {
    nama_stall,
    status,
    user,
  } = body
  const supabase = createRouteHandlerClient({ cookies })

  const [stallCat] = nama_stall.match(/[a-z]+/i)
  const { data: alikeStall } = await supabase.from('stalls')
    .select('id_stall',)
    .like('nama_stall', `%${stallCat.toUpperCase()}%`)

  const id_stall = `st${stallCat.toLowerCase()}${frtStallId(alikeStall.length)}`
  const { data: sameStall } = await supabase.from('stalls')
    .select('nama_stall',)
    .eq('nama_stall', nama_stall.toUpperCase())

  if (sameStall.length >= 1) {
    return NextResponse.json({ error: 'Stall tersebut sudah ada' })
  }

  let newStatus = status
  if (!['tersedia', 'sibuk'].includes(status)) {
    newStatus = 'tersedia'
  }
  const { data: newStall, error: stallInsertError } = await supabase.from('stalls')
    .insert({
      id_stall,
      nama_stall: nama_stall.toUpperCase(),
      status: newStatus
    })
    .select('id_stall')

  let newUser = user
  if (user === '' || !user) {
    newUser = []
  }

  if (newUser.length === 0) {
    return NextResponse.json({
      data: newStall ? 'Data berhasil di input' : null,
      error: stallInsertError
    })
  }

  const picStall = newUser.map((user) => ({
    id_teknisi: user.value,
    id_stall: newStall[0].id_stall,
  }))
  const { data: newPic, error: bulkPicInsertError } = await supabase
    .from('stall_pic')
    .insert(picStall)
    .select()

  return NextResponse.json({
    data: (newStall && newPic) || newStall ? 'Data berhasil di input' : null,
    error: stallInsertError
      ? stallInsertError.message
      : bulkPicInsertError
        ? bulkPicInsertError.message
        : null
  })
}

const getStalls = async (supabase) => await supabase.from('stalls').select()

const getStallsWithPic = async (supabase) => {
  const response = await supabase
    .from('stalls')
    .select(`
      id_stall,
      nama_stall,
      status,
      stall_pic (
        employees ( id_employee, nama)
      )
    `)
    .order('nama_stall', { ascending: false })

  const data = response.data.map((dat) => ({
    ...dat,
    stall_pic: dat.stall_pic.map(({ employees }) => employees.nama).join(' - ')
  }))
  return {
    ...response,
    data,
  }
}
