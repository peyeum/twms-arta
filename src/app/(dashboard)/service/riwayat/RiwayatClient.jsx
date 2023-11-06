'use client'
import React, { useState } from 'react'
import { RiwayatServiceContext } from './context'
import DataTable from '@/components/DataTable'
import FormAllocation from '../FormAllocation'
import { useDisclosure } from '@chakra-ui/react'
import columns from './columns'
import DangerAlert from '@/components/DangerAlert'
import { useRouter } from 'next/navigation'

export default function RiwayatClient({
  data,
  usersOptions,
  carsOptions,
  statusOptions,
  stallOptions,
}) {
  const router = useRouter()
  const [allocation, setAllocation] = useState({})
  const [title, setTitle] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure()

  const handleAddActions = () => {
    setAllocation({})
    setTitle('Tambah Data Alokasi')
    onOpen()
  }

  const handleEditActions = (data) => {
    onOpen()
    setTitle('Edit Data Alokasi')
    setAllocation(data)
  }

  const handleDeleteActions = ({ id_service }) => {
    setAllocation(id_service)
    onDeleteModalOpen()
  }
  const deleteCallback = async () => {
    const id_service = allocation
    const res = await fetch(`/api/service/${id_service}`, { method: 'delete'})
    const { error } = await res.json()
    onDeleteModalClose()
    router.refresh()
  }

  const dependant = {
    usersOptions,
    carsOptions,
    statusOptions,
    stallOptions,
    onClose,
    isOpen,
  }
  return (
    <RiwayatServiceContext.Provider
      value={{
        handleEditActions,
        handleAddActions,
        handleDeleteActions,
        onClose,
        isOpen,
        title,
        usersOptions,
        carsOptions,
        statusOptions,
        stallOptions,
      }}
    >
      <DataTable
        form={<FormAllocation allocation={allocation} noContext={dependant} />}
        data={data}
        columns={columns}
        context={RiwayatServiceContext}
      />
      <DangerAlert
        onClose={onDeleteModalClose}
        isOpen={isDeleteModalOpen}
        message='Anda tidak dapat membatalkan tindakan ini setelahnya.'
        title='Hapus Alokasi Service'
        callback={deleteCallback}
      />
    </RiwayatServiceContext.Provider>
  )
}
