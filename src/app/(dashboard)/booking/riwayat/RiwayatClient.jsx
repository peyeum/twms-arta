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
  carsOptions,
  statusOptions,
  stallOptions,
}) {
  const router = useRouter()
  const [allocation, setAllocation] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState('')
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

  const handleDeleteActions = ({ id_booking }) => {
    setAllocation(id_booking)
    onDeleteModalOpen()
  }
  const deleteCallback = async () => {
    const id_booking = allocation
    const res = await fetch(`/api/bookings/${id_booking}`, { method: 'delete'})
    const { error } = await res.json()
    onDeleteModalClose()
    router.refresh()
  }

  const dependant = {
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
        title='Hapus Alokasi Booking'
        callback={deleteCallback}
      />
    </RiwayatServiceContext.Provider>
  )
}
