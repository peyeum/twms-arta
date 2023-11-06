const users = [
  {
    id_user: 422312,
    nama: 'Iwan',
    jabatan: 'Service Advisor',
  },
  {
    id_user: 305839,
    nama: 'Ayip',
    jabatan: 'Service Advisor',
  },
  {
    id_user: 920342,
    nama: 'Fendra',
    jabatan: 'Service Advisor',
  },
  {
    id_user: 120392,
    nama: 'Dityo',
    jabatan: 'Service Advisor',
  },
  {
    id_user: 342125,
    nama: 'Eri',
    jabatan: 'Foreman',
  },
  {
    id_user: 643589,
    nama: 'Farhan',
    jabatan: 'Foreman',
  },
  {
    id_user: 345795,
    nama: 'Rouf',
    jabatan: 'Foreman',
  },
  {
    id_user: 452212,
    nama: 'Maulana',
    jabatan: 'Teknisi',
  },
  {
    id_user: 985578,
    nama: 'Deni',
    jabatan: 'Teknisi',
  },
  {
    id_user: 672931,
    nama: 'Zulfian',
    jabatan: 'Teknisi',
  },
  {
    id_user: 135324,
    nama: 'Rifkal',
    jabatan: 'Teknisi',
  },
  {
    id_user: 466673,
    nama: 'Rival',
    jabatan: 'Teknisi',
  },
  {
    id_user: 778554,
    nama: 'Fadli',
    jabatan: 'Teknisi',
  },
  {
    id_user: 957765,
    nama: 'Wahyu',
    jabatan: 'Teknisi',
  },
  {
    id_user: 112684,
    nama: 'Dedi',
    jabatan: 'Teknisi',
  },
  {
    id_user: 703216,
    nama: 'Apin',
    jabatan: 'Teknisi',
  },
  {
    id_user: 129323,
    nama: 'Cristamay',
    jabatan: 'Teknisi',
  },
  {
    id_user: 124744,
    nama: 'Wahid',
    jabatan: 'Teknisi',
  },
  {
    id_user: 667433,
    nama: 'Aan',
    jabatan: 'Teknisi',
  },
  {
    id_user: 533457,
    nama: 'Ilham',
    jabatan: 'Teknisi',
  },
]

export const getAllUsers = async () => {
  return users
}

export const getUserById = async (id) => {
  return users.find((user) => user.id_user === id)
}

export const deleteUser = async (id) => {
  users.splice(users.findIndex((user) => user.id_user === id), 1)
}

export const addUser = async (data) => {
  users.push(data)
}

export const updateUsers = (id, data) => {
  const index = users.findIndex((user) => user.id_user === id)
  users[index] = data
}

export default users
