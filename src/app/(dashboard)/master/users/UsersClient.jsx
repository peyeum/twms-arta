'use client'

import DataTable from "@/components/DataTable";
import FormUsers from "./FormUsers";
import columns from "./columns";
import { UsersContext } from "./context";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import DangerAlert from "@/components/DangerAlert";
import { useRouter } from "next/navigation";

export default function UsersClient({data}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: hasOpen, onOpen: whenOpen, onClose: whenClose } = useDisclosure()
  const [title, setTitle] = useState('')
  const [dataUser, setDataUser] = useState({})
  const router = useRouter()
  const handleEditActions = (data) => {
    setTitle('Edit Data User')
    setDataUser(data)
    onOpen()
  }
  const handleDeleteActions = async ({ id_employee }) => {
    setDataUser(id_employee)
    whenOpen()
  }
  const deleteCallback = async () => {
    const id_employee = dataUser
    const res = await fetch(`/api/users/${id_employee}`, { method: 'delete'})
    const { error } = await res.json()
    router.refresh()
  }
  const handleAddActions = ({}) => {
    setTitle('Tambah Data User')
    setDataUser({})
    onOpen()
  }
  const contextValues = {
    isOpen,
    onOpen,
    onClose,
    title,
    setTitle,
    dataUser,
    setDataUser,
    handleAddActions,
    handleEditActions,
    handleDeleteActions,
  }

  return (
    <UsersContext.Provider value={contextValues}>
      <DataTable
        data={data}
        columns={columns}
        form={<FormUsers />}
        context={UsersContext}
      />
      <DangerAlert
        onClose={whenClose}
        isOpen={hasOpen}
        message='Anda tidak dapat membatalkan tindakan ini setelahnya.'
        title='Hapus User'
        callback={deleteCallback}
      />
    </UsersContext.Provider>
  )
}
