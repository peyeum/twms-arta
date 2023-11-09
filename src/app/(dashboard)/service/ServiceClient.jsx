'use client'
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  Link,
  Stack,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { FiBook, FiPlus } from 'react-icons/fi'
import HourHeader from './HourHeader'
import MinutesHeader from './MinutesHeader'
import StallsHeader from './StallsHeader'
import { ServiceContext } from './context'
import ModalForm from '@/components/ModalForm'
import FormAllocation from './FormAllocation'
import DangerAlert from '@/components/DangerAlert'
import DatePickerCS from '@/components/DatePickerCS'
import FormMobil from './FormMobil'
import { format, isSameDay } from 'date-fns'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import StatusColorGuide from '@/components/services/StatusColorGuide'

export default function ServiceClient({
  usersOptions,
  carsOptions,
  statusOptions,
  stallOptions,
  dataStalls,
  dataAllocations,
  children,
  ...rest
}) {
  const [currentAllocation, setCurrentAllocation] = useState({})
  const [platnopol, setPlatnopol] = useState('')
  const [carValueCallbackSetter, setCarValueCallbackSetter] = useState()
  const [allocations, setAllocations] = useState(dataAllocations)
  const [clientCarOptions, setClientCarOptions] = useState(carsOptions)
  const [serviceDate, setServiceDate] = useState(new Date())
  const { isOpen, onOpen, onClose } = useDisclosure()
  const supabase = createClientComponentClient()
  
  const handleServiceDateChange = async (date) => {
    setServiceDate(date)
    const dServiceDay = format(date, 'yyyy/MM/dd')
    const res = await fetch(`/api/service?d=${dServiceDay}`)
    const { data, error } = await res.json()
    setAllocations(data)
  }
  
  const {
    isOpen: isAllocationFormOpen,
    onOpen: onAllocationFormOpen,
    onClose: onAllocationFormClose,
  } = useDisclosure()

  const {
    isOpen: isCarFormOpen,
    onOpen: onCarFormOpen,
    onClose: onCarFormClose,
  } = useDisclosure()

  const handleAddActions = () => {
    setCurrentAllocation({})
    onAllocationFormOpen()
  }

  const handleEditActions = (data) => {
    onAllocationFormOpen()
    setCurrentAllocation(data)
  }

  const handleDeleteActions = ({ id_service }) => {
    setCurrentAllocation(id_service)
    onOpen()
  }
  const deleteCallback = async () => {
    const id_service = currentAllocation
    const res = await fetch(`/api/service/${id_service}`, { method: 'delete'})
    const { error } = await res.json()
    onClose()
  }

  const handleAddCarActions = (nopol, inputSetter) => {
    onCarFormOpen()
    setPlatnopol(nopol)
    setCarValueCallbackSetter(() => inputSetter)
  }

  const handleAllocationChange = async ({ eventType, new: newAllocation, old,  }) => {
    const res = await fetch(`/api/service/${newAllocation?.id_service}`, {method: 'get'})
    const { data, error } = await res.json()

    const isDifferentDay = data?.tgl_service
      ? !isSameDay(serviceDate, new Date(data.tgl_service))
      : false

    if (isDifferentDay) return

    switch (eventType) {
      case 'INSERT': {
        return setAllocations((oldAllocations) => [...oldAllocations, data])
      }
      case 'UPDATE': {
        return setAllocations((oldAllocations) => oldAllocations
          .map((allocation) => {
            if (allocation.id_service === data.id_service) return data
            return allocation
          }))
      }
      case 'DELETE': {
        return setAllocations((oldAllocations) => oldAllocations
          .filter((allocation) => allocation.id_service !== old.id_service))
      }
      default: {
        return null
      }
    }
  }

  const handleCarChange = async ({ eventType, new: newCar, old,  }) => {
  
    const newCarOptions = {
      value: newCar?.id_mobil,
      label: newCar?.nopol,
    } ?? undefined

    switch (eventType) {
      case 'INSERT': {
        return setClientCarOptions((oldCars) => [...oldCars, newCarOptions])
      }
      case 'UPDATE': {
        return setClientCarOptions((oldCars) => oldCars
          .map((car) => {
            if (car.value === newCarOptions?.value) return newCarOptions
            return car
          }))
      }
      case 'DELETE': {
        return setClientCarOptions((oldCars) => oldCars
          .filter((car) => car.value !== old.id_mobil))
      }
      default: {
        return null
      }
    }
  }

  useEffect(() => {
    const seviceChannel = supabase
      .channel('service allocations')
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'service' },
        handleAllocationChange)
      .on('postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'service' },
        handleAllocationChange)
      .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'service_detail_teknisi' },
      handleAllocationChange)
      .on('postgres_changes',
      { event: '*', schema: 'public', table: 'cars' },
      handleCarChange)
      .subscribe()

    return () => supabase.removeChannel(seviceChannel)
  }, [ supabase, serviceDate ])
  
  const [isModalOpenGlobal, setIsModalOpenGlobal] = useState(false)
  const hourWidth = 120
  const rowGap = 2
  const minuteWidth = (hourWidth / 4 ) - rowGap
  const boxRef = useRef(null)
  const tableRef = useRef(null)

  return (
    <ServiceContext.Provider value={{
      isModalOpenGlobal,
      setIsModalOpenGlobal,
      hourWidth,
      rowGap,
      minuteWidth,
      isAllocationFormOpen,
      onAllocationFormOpen,
      onAllocationFormClose,
      handleEditActions,
      handleAddCarActions,
      handleDeleteActions,
      onCarFormClose,
      platnopol,
      carValueCallbackSetter,
      currentAllocation,
      usersOptions,
      carsOptions: clientCarOptions,
      stallOptions,
      statusOptions,
    }}>
      <Box overflow='hidden' ref={boxRef} >
        <Flex align='center' justify='' gap='1'>
          <Tooltip
            label='Tambah Alokasi Service'
          >
            <IconButton
              icon={< FiPlus />}
              aria-label='Tambah Alokasi Service'
              onClick={handleAddActions}
              bg='blue.400'
              color='gray.100'
              _hover={{ bg: 'blue.700' }}
            />
          </Tooltip>
        
          <Link
            display='flex'
            alignItems='center'
            justifyContent='center'
            href='/service/riwayat'
            h='10'
            px='2'
            py='1'
            rounded='lg'
            gap='1'
            textDecor='none'
            bg='blue.400'
            color='gray.100'
            _hover={{ bg: 'blue.700' }}
          >
            <Icon
              aria-label='Riwayat Service'
              as={FiBook}
            />
            Riwayat Service
          </Link>
          <Tooltip label='Pilih Tanggal Service'>
            <Box>
              <Input
                type='date'
                w='36'
                h='10'
                bg='blue.400'
                color='gray.100'
                _hover={{ bg: 'blue.700' }}
                selected={serviceDate}
                onChange={handleServiceDateChange}
                maxDate={new Date()}
                dateFormat='dd/MM/yyyy'
                as={DatePickerCS}
              />
            </Box>
          </Tooltip>
          <Flex
            h='10'
            px='2'
            py='1'
            rounded='lg'
            bg='blue.400'
            color='gray.100'
            align='center'
            gap='1'
          >
            <span>IU Service :</span>
            <span>{(allocations?.length > 0) ? ` ${allocations.length}` : ' -' }</span>
          </Flex>
        </Flex>
        <Stack
          ref={tableRef}
          mt='2'
          spacing='0.5'
          bg='gray.700'
          w={boxRef?.current?.offsetWidth <= tableRef?.current?.offsetWidth
            ? 'auto'
            : 'max-content'}
          p={rowGap + 'px'}
          overflowX='scroll'
        >
          <HourHeader hourWidth={hourWidth} rowGap={rowGap} />
          <MinutesHeader hourWidth={hourWidth} rowGap={rowGap} minuteWidth={minuteWidth} />
          <StallsHeader
            dataStalls={dataStalls}
            dataAllocations={allocations}
          />
        </Stack>
        <StatusColorGuide />
      </Box>
      <ModalForm
        modalTitle='Form Alokasi Service'
        isOpen={isAllocationFormOpen}
        onClose={onAllocationFormClose}
      >
        <FormAllocation allocation={currentAllocation} />
      </ModalForm>
      <ModalForm
        modalTitle='Tambah Data Mobil'
        isOpen={isCarFormOpen}
        onClose={onCarFormClose}
      >
        <FormMobil />
      </ModalForm>
      <DangerAlert
        onClose={onClose}
        isOpen={isOpen}
        message='Anda tidak dapat membatalkan tindakan ini setelahnya.'
        title='Hapus Alokasi Service'
        callback={deleteCallback}
      />
    </ServiceContext.Provider>
  )
}
