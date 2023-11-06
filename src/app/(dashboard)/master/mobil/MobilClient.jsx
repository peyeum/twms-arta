'use client'

import DataTable from "@/components/DataTable";
import FormMobil from "./FormMobil";
import columns from "./columns";
import { MobilContext } from "./context";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import DangerAlert from "@/components/DangerAlert";
import { useRouter } from "next/navigation";

export default function MobilClient({data, options}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: hasOpen, onOpen: whenOpen, onClose: whenClose } = useDisclosure()
  const [title, setTitle] = useState('')
  const [dataMobil, setDataMobil] = useState({})
  const router = useRouter()
  const handleEditActions = (data) => {
    setTitle('Edit Data Mobil')
    setDataMobil(data)
    onOpen()
  }
  const handleDeleteActions = async ({ id_mobil }) => {
    setDataMobil(id_mobil)
    whenOpen()
  }
  const deleteCallback = async () => {
    const id_mobil = dataMobil
    const res = await fetch(`/api/cars/${id_mobil}`, { method: 'delete'})
    const { error } = await res.json()
    router.refresh()
  }
  const handleAddActions = ({}) => {
    setTitle('Tambah Data Mobil')
    setDataMobil({})
    onOpen()
  }
  const contextValues = {
    isOpen,
    onOpen,
    onClose,
    title,
    setTitle,
    dataMobil,
    setDataMobil,
    handleAddActions,
    handleEditActions,
    handleDeleteActions,
  }

  return (
    <MobilContext.Provider value={contextValues}>
      <DataTable
        data={data}
        columns={columns}
        form={<FormMobil ownerOptions={options} />}
        context={MobilContext}
      />
      <DangerAlert
        onClose={whenClose}
        isOpen={hasOpen}
        message='Anda tidak dapat membatalkan tindakan ini setelahnya.'
        title='Hapus Mobil'
        callback={deleteCallback}
      />
    </MobilContext.Provider>
  )
}
