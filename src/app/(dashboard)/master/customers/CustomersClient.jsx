'use client'

import DataTable from "@/components/DataTable";
import FormCustomer from "./FormCustomer";
import columns from "./columns";
import { CustomerContext } from "./context";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DangerAlert from "@/components/DangerAlert";

export default function CustomerClient({data}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: hasOpen, onOpen: whenOpen, onClose: whenClose } = useDisclosure()
  const [title, setTitle] = useState('')
  const [dataCustomer, setDataCustomer] = useState({})
  const router = useRouter()
  const handleEditActions = (data) => {
    setTitle('Edit Data Customer')
    setDataCustomer(data)
    onOpen()
  }
  const handleDeleteActions = async ({ id_customer }) => {
    setDataCustomer (id_customer)
    whenOpen()
  }
  const deleteCallback = async () => {
    const id_customer = dataCustomer
    const res = await fetch(`/api/customers/${id_customer}`, { method: 'delete'})
    const { error } = await res.json()
    router.refresh()
  }
  const handleAddActions = ({}) => {
    setTitle('Tambah Data Customer')
    setDataCustomer({})
    onOpen()
  }
  const contextValues = {
    isOpen,
    onOpen,
    onClose,
    title,
    setTitle,
    dataCustomer,
    setDataCustomer,
    handleAddActions,
    handleEditActions,
    handleDeleteActions,
  }

  return (
    <CustomerContext.Provider value={contextValues}>
      <DataTable
        data={data}
        columns={columns}
        form={<FormCustomer />}
        context={CustomerContext}
      />
      <DangerAlert
        onClose={whenClose}
        isOpen={hasOpen}
        message='Anda tidak dapat membatalkan tindakan ini setelahnya.'
        title='Hapus Customer'
        callback={deleteCallback}
      />
    </CustomerContext.Provider>
  )
}
