import { getUserById } from "../users/userersMockup"

const stalls = [
  {
    id_stall: 'st-qs-001',
    nama_stall: 'QS1',
    status: 'tersedia',
    id_user: 452212,
  },
  {
    id_stall: 'st-qs-002',
    nama_stall: 'QS2',
    status: 'tersedia',
    id_user: 672931,
  },
  {
    id_stall: 'st-qs-003',
    nama_stall: 'FI',
    status: 'tersedia',
    id_user: 466673,
  },
  {
    id_stall: 'st-pm-001',
    nama_stall: 'PM1',
    status: 'tersedia',
    id_user: 957765,
  },
  {
    id_stall: 'st-pm-002',
    nama_stall: 'PM2',
    status: 'tersedia',
    id_user: 112684,
  },
  {
    id_stall: 'st-pm-003',
    nama_stall: 'PM3',
    status: 'tersedia',
    id_user: 703216,
  },
  {
    id_stall: 'st-gr-001',
    nama_stall: 'GR1',
    status: 'tersedia',
    id_user: 129323,
  },
  {
    id_stall: 'st-gr-002',
    nama_stall: 'GR2',
    status: 'tersedia',
    id_user: 124744,
  },
  {
    id_stall: 'st-gr-003',
    nama_stall: 'GR3',
    status: 'tersedia',
    id_user: 667433,
  },
  {
    id_stall: 'st-gr-004',
    nama_stall: 'GR4',
    status: 'tersedia',
    id_user: 533457,
  },
]

export const getAllStalls = async () => {
  return stalls
}

export const getAllStallsWithUser = async () => {
  return await Promise.all(stalls.map(async (stall) => {
    const user = await getUserById(stall.id_user)
    return {
      ...stall,
      nama_user: user?.nama,
    }
  }))
}

export const getStallById = async (id) => {
  return stalls.find((stall) => stall.id_stall === id)
}

export const deleteStall = async (id) => {
  stalls.splice(stalls.findIndex((stall) => stall.id_stall === id), 1)
}

export const addStall = async (data) => {
  stalls.push(data)
}

export const updateStalls = (id, data) => {
  const index = stalls.findIndex((stall) => stall.id_stall === id)
  stalls[index] = data
}

export default stalls
