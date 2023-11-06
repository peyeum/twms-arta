const customers = [
  {
    "id_customer": "abc1234",
    "nama": "Ahmad",
    "alamat": "Jalan Merdeka No. 123, Jakarta"
  },
  {
    "id_customer": "901klm6",
    "nama": "Budi",
    "alamat": "Jalan Gajah Mada No. 45, Tangerang"
  },
  {
    "id_customer": "012bcd3",
    "nama": "Citra",
    "alamat": "Jalan Sudirman No. 67, Bekasi"
  },
  {
    "id_customer": "678uvwx",
    "nama": "David",
    "alamat": "Jalan Thamrin No. 89, Bogor"
  },
  {
    "id_customer": "890hij5",
    "nama": "Eka",
    "alamat": "Jalan Hayam Wuruk No. 12, Depok"
  },
  {
    "id_customer": "890nop7",
    "nama": "Firman",
    "alamat": "Jalan Gatot Subroto No. 34, Jakarta"
  },
  {
    "id_customer": "234klm6",
    "nama": "Gita",
    "alamat": "Jalan Surya Kencana No. 56, Tangerang"
  },
  {
    "id_customer": "678klm6",
    "nama": "Hana",
    "alamat": "Jalan Akses UI No. 78, Bekasi"
  },
  {
    "id_customer": "stu6789",
    "nama": "Ibrahim",
    "alamat": "Jalan Veteran No. 90, Bogor"
  },
  {
    "id_customer": "123z12a",
    "nama": "Joko",
    "alamat": "Jalan Merdeka Raya No. 11, Depok"
  },
  {
    "id_customer": "789ijkl",
    "nama": "Kusuma",
    "alamat": "Jalan Kuningan No. 10, Jakarta"
  },
  {
    "id_customer": "678efg4",
    "nama": "Lia",
    "alamat": "Jalan Pemuda No. 9, Tangerang"
  },
  {
    "id_customer": "012mnop",
    "nama": "Michael",
    "alamat": "Jalan Permata No. 8, Bekasi"
  },
  {
    "id_customer": "234tuv9",
    "nama": "Nita",
    "alamat": "Jalan Gemilang No. 7, Bogor"
  },
  {
    "id_customer": "678bcd3",
    "nama": "Oscar",
    "alamat": "Jalan Semangat No. 6, Depok"
  },
  {
    "id_customer": "jkl3456",
    "nama": "Putri",
    "alamat": "Jalan Cendana No. 5, Jakarta"
  },
  {
    "id_customer": "345z12a",
    "nama": "Rahman",
    "alamat": "Jalan Harmoni No. 4, Tangerang"
  },
  {
    "id_customer": "678nop7",
    "nama": "Siti",
    "alamat": "Jalan Malabar No. 3, Bekasi"
  },
  {
    "id_customer": "789qrs8",
    "nama": "Tono",
    "alamat": "Jalan Pahlawan No. 2, Bogor"
  },
  {
    "id_customer": "901bcd3",
    "nama": "Umi",
    "alamat": "Jalan Kelapa Gading No. 1, Depok"
  }
]

export const getAllCustomers = async () => {
  return customers
}

export const getCustomerById = async (id) => {
  return customers.find((customer) => customer.id_customer === id)
}

export const deleteCustomer = async (id) => {
  customers.splice(customers.findIndex((customer) => customer.id_customer === id), 1)
}

export const addCustomer = async (data) => {
  customers.push(data)
}

export const updateCustomer = (id, data) => {
  const index = customers.findIndex((customer) => customer.id_customer === id)
  customers[index] = data
}

export default customers
