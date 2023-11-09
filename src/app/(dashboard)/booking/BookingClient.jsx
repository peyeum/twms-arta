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
import HourHeader from './HourHeader'
import MinutesHeader from './MinutesHeader'
import StallsHeader from './StallsHeader'
import ModalForm from '@/components/ModalForm'
import FormAllocation from './FormAllocation'
import FormMobil from './FormMobil'
import DatePickerCS from '@/components/DatePickerCS'
import DangerAlert from '@/components/DangerAlert'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { BookingContext } from './context'
import { addDays, format, getHours, isSameDay } from 'date-fns'
import { FiBook, FiPlus } from 'react-icons/fi'

const TODAY_LIMIT_BOOKING_HOUR = 15
export default function BookingClient({
  usersOptions,
  carsOptions,
  stallOptions,
  statusOptions,
  dataStalls,
  dataAllocations,
  children,
  ...rest
}) {

  const tomorrow = addDays(new Date(), 1)
  const supabase = createClientComponentClient()
  const [allocations, setAllocations] = useState(dataAllocations)
  const [currentAllocation, setCurrentAllocation] = useState({})
  const [platnopol, setPlatnopol] = useState('')
  const [carValueCallbackSetter, setCarValueCallbackSetter] = useState()
  const [clientCarOptions, setClientCarOptions] = useState(carsOptions)
  const [bookingDate, setBookingDate] = useState(
    getHours(new Date()) >= TODAY_LIMIT_BOOKING_HOUR ? tomorrow : new Date()
  )
  const { isOpen, onOpen, onClose } = useDisclosure()

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

  const handleBookingDateChange = async (date) => {
    setBookingDate(date)
    const dBookingDay = format(date, 'yyyy/MM/dd')
    const res = await fetch(`/api/bookings?d=${dBookingDay}`)
    const { data, error } = await res.json()
    setAllocations(data)
  }

  const handleAddActions = () => {
    setCurrentAllocation({})
    onAllocationFormOpen()
  }

  const handleEditActions = (data) => {
    onAllocationFormOpen()
    setCurrentAllocation(data)
  }

  const handleDeleteActions = ({ id_booking }) => {
    setCurrentAllocation(id_booking)
    onOpen()
  }
  const deleteCallback = async () => {
    const id_booking = currentAllocation
    const res = await fetch(`/api/bookings/${id_booking}`, { method: 'delete'})
    const { error } = await res.json()
    onClose()
  }

  const handleAddCarActions = (nopol, inputSetter) => {
    onCarFormOpen()
    setPlatnopol(nopol)
    setCarValueCallbackSetter(() => inputSetter)
  }

  const handleAllocationChange = async ({ eventType, new: newAllocation, old,  }) => {
    const isDifferentDay = newAllocation?.appointment
      ? !isSameDay(bookingDate, new Date(newAllocation.appointment))
      : false

    if (isDifferentDay) return

    const res = await fetch(`/api/bookings/${newAllocation?.id_booking}`, { method: 'get'})
    const { data, error } = await res.json()

    switch (eventType) {
      case 'INSERT': {
        return setAllocations((oldAllocations) => [...oldAllocations, data])
      }
      case 'UPDATE': {
        return setAllocations((oldAllocations) => oldAllocations
          .map((allocation) => {
            if (allocation.id_booking === data.id_booking) return data
            return allocation
          }))
      }
      case 'DELETE': {
        return setAllocations((oldAllocations) => oldAllocations
          .filter((allocation) => allocation.id_booking !== old.id_booking))
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
    const bookingChannel = supabase
      .channel('booking allocations')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        handleAllocationChange)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'cars' },
        handleCarChange)
      .subscribe()

    return () => supabase.removeChannel(bookingChannel)
  }, [ supabase, bookingDate ])
  
  const [isModalOpenGlobal, setIsModalOpenGlobal] = useState(false)
  const hourWidth = 120
  const rowGap = 2
  const minuteWidth = (hourWidth / 4 ) - rowGap
  const boxRef = useRef(null)
  const tableRef = useRef(null)
  return (
    <BookingContext.Provider value={{
      isModalOpenGlobal,
      setIsModalOpenGlobal,
      hourWidth,
      rowGap,
      minuteWidth,
      isAllocationFormOpen,
      onAllocationFormOpen,
      onAllocationFormClose,
      handleEditActions,
      handleDeleteActions,
      handleAddCarActions,
      carValueCallbackSetter,
      onCarFormClose,
      platnopol,
      currentAllocation,
      usersOptions,
      // carsOptions,
      carsOptions: clientCarOptions,
      // setClientCarOptions,
      stallOptions,
      statusOptions,
    }}>
      <Box ref={boxRef} overflow='hidden' >
        <Flex align='center' justify='' gap='1'>
          <Tooltip
            label='Tambah Alokasi Booking'
          >
            <IconButton
              icon={< FiPlus />}
              aria-label='Tambah Alokasi Booking'
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
            href='/booking/riwayat'
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
              aria-label='Riwayat Booking'
              as={FiBook}
            />
            Riwayat Booking
          </Link>
          <Tooltip label='Pilih Tanggal Booking'>
            <Box>
              <Input
                type='date'
                w='36'
                h='10'
                bg='blue.400'
                color='gray.100'
                _hover={{ bg: 'blue.700' }}
                selected={bookingDate}
                onChange={handleBookingDateChange}
                maxDate={tomorrow}
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
            <span>Total Unit Booking :</span>
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
      </Box>
      <ModalForm
        modalTitle='Form Alokasi Booking'
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
        title='Hapus Alokasi Booking'
        callback={deleteCallback}
      />
    </BookingContext.Provider>
  )
}
