'use client'

import DataTable from "@/components/DataTable";
import FormStalls from "./FormStalls";
import columns from "./columns";
import { StallsContext } from "./context";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import DangerAlert from "@/components/DangerAlert";
import { useRouter } from "next/navigation";

export default function StallsClient({data, options}) {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: hasOpen, onOpen: whenOpen, onClose: whenClose } = useDisclosure()
  const [title, setTitle] = useState('')
  const [dataStall, setDataStall] = useState({})
  const handleEditActions = (data) => {
    setTitle('Edit Data Stall')
    setDataStall(data)
    onOpen()
  }
  const handleDeleteActions = async ({ id_stall }) => {
    setDataStall(id_stall)
    whenOpen()
  }

  const deleteCallback = async () => {
    const id_stall = dataStall
    const res = await fetch(`/api/stalls/${id_stall}`, { method: 'delete'})
    const { error } = await res.json()
    router.refresh()
  }

  const handleAddActions = () => {
    setTitle('Tambah Data Stall')
    setDataStall({})
    onOpen()
  }
  const contextValues = {
    isOpen,
    onOpen,
    onClose,
    title,
    setTitle,
    dataStall,
    setDataStall,
    handleAddActions,
    handleEditActions,
    handleDeleteActions,
  }

  return (
    <StallsContext.Provider value={contextValues}>
      <DataTable
        data={data}
        columns={columns}
        form={<FormStalls userOptions={options} />}
        context={StallsContext}
      />
      <DangerAlert
        onClose={whenClose}
        isOpen={hasOpen}
        message='Anda tidak dapat membatalkan tindakan ini setelahnya.'
        title='Hapus Stall'
        callback={deleteCallback}
      />
    </StallsContext.Provider>
  )
}
