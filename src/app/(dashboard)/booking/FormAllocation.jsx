'use client'
import React, { useState } from 'react'
import { useBookingContext } from './context'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  useBoolean,
  useToast,
} from '@chakra-ui/react'
import DatePickerCS from '@/components/DatePickerCS'
import { AsyncCreatableSelect, AsyncSelect } from "chakra-react-select"
import { customPickBy, formatTglWaktu, isDate, isEmptyObject, wait } from '@/app/helper'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { addDays } from 'date-fns'

export default function FormAllocation({ allocation, noContext }) {

  const {
    onAllocationFormClose,
    onClose,
    handleAddCarActions,
    carsOptions,
    statusOptions,
    stallOptions,
    // isAllocationFormOpen,
    // usersOptions,
  } = noContext ?? useBookingContext()

  const {
    id_booking,
    id_stall,
    id_mobil,
    appointment,
    status,
    note,
  } = allocation

  const router = useRouter()
  const defaultStatus = { value: 'waiting', label: 'Belum Datang'}
  const timeOption = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: 'Asia/Jakarta',
  }

  const selectedCar = carsOptions.find((item) => item.value === id_mobil)
  const selectedStatus = statusOptions.find((item) => item.value === status)
  const selectedStall = stallOptions.find((item) => item.value === id_stall)
  
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting, dirtyFields },
    reset,
  } = useForm({
    defaultValues: {
      id_booking: id_booking ?? undefined,
      appointment: appointment ? new Date(appointment) : addDays(new Date(), 1),
      note: note ?? '',
      car: selectedCar ?? undefined,
      stall: selectedStall ?? undefined,
      status: selectedStatus ?? defaultStatus,
    }
  })

  const toast = useToast()
  const onSubmit = async (dataForm) => {
    const { id_booking } = dataForm
    if (id_booking) {
      const changedData = dirtyFields
      const isSelected = (_, key) => changedData[key] === true
      const changedDataForm = customPickBy(dataForm, isSelected)
      
      if (isEmptyObject(changedDataForm)) {
        toast({
          title: 'Tidak ada perubahan data',
          isClosable: true,
          status: 'warning'
        })
        onAllocationFormClose ? onAllocationFormClose() : onClose()
        return
      }

      const res = await fetch(`/api/bookings/${id_booking}`, {
        method: 'put',
        body: JSON.stringify(changedDataForm),
      })
      const { data, error } = await res.json()
      if (error) {
        toast({
          title: error,
          isClosable: true,
          status: 'error'
        })
      }
      if (data) {
        toast({
          title: data.message,
          isClosable: true,
          status: 'success'
        })
        !!onClose && router.refresh()
        await wait(500)
        onAllocationFormClose ? onAllocationFormClose() : onClose()
      }  
      return
    }

    const res = await fetch('/api/bookings', {
      method: 'post',
      body: JSON.stringify(dataForm),
    })
    const { data, error } = await res.json()
    if (error) {
      toast({
        title: error,
        isClosable: true,
        status: 'error'
      })
    }
    if (data) {
      toast({
        title: data.message,
        isClosable: true,
        status: 'success'
      })
      !!onClose && router.refresh()
      await wait(500)
      reset()
      onAllocationFormClose ? onAllocationFormClose() : onClose()
    }
  }
  const setCarInputValue = (data) => {
    setValue('car', data , { shouldValidate: true})
  }

  const [isCarMenuOpen, setCarMenu] = useBoolean()
  const handleOnInputChange = (inputVal) => inputVal === ''
    ? setCarMenu.off()
    : setCarMenu.on()
  const filterCar = (inputValue) => {
    const filtered = carsOptions
      .filter((i) => i.label?.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, 10)
    return [
      ...filtered,
      {
        value: 'x',
        label: filtered.length > 0
          ? `menampilkan ${filtered.length} data dari ${carsOptions.length} data...`
          : 'mobil tidak ditemukan...',
        isDisabled: true,
      }
    ]
  }
  const promiseCarOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterCar(inputValue));
      }, 1000);
    })

  // status
  const filterStatus = (inputValue) => {
    return statusOptions.filter((i) =>
      i.label?.toLowerCase().includes(inputValue.toLowerCase())
    )
  }
  const promiseStatusOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterStatus(inputValue));
      }, 1000);
    })
  
  // stall
  const filterStall = (inputValue) => {
    return stallOptions.filter((i) =>
      i.label?.toLowerCase().includes(inputValue.toLowerCase())
    )
  }
  const promiseStallOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterStall(inputValue));
      }, 1000);
    })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
        {id_booking &&
              <Input type='hidden' {...register('id_booking')} />}
        
        <FormControl isInvalid={!!errors.appointment}>
          <FormLabel>Appointment</FormLabel>
          <Controller
            name='appointment'
            control={control}
            rules={{
              required: 'Tentukan tanggal dan waktu booking',
            }}
            render={({field: { onChange, onBlur, value, ref }}) => (
              <Input
                type='date'
                maxDate={addDays(new Date(),1)}
                dateFormat='dd/MM/yyyy hh:mm'
                timeInputLabel='Jam : '
                showTimeInput
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                as={DatePickerCS}
              />
            )}
          />
          <FormErrorMessage>{errors?.appointment?.message}</FormErrorMessage>
        </FormControl>
        
        <FormControl isInvalid={!!errors.car}>
          <FormLabel>Mobil</FormLabel>
            <Controller
              name='car'
              control={control}
              rules={{
                required: 'Pilih mobil yang akan booking',
              }}
              render={({field}) => (
                <AsyncCreatableSelect
                  {...field}
                  placeholder='Pilih Mobil'
                  cacheOptions
                  loadOptions={promiseCarOptions}
                  defaultOptions
                  isClearable
                  menuIsOpen={isCarMenuOpen}
                  onInputChange={handleOnInputChange}
                  onCreateOption={(data) => {
                    handleAddCarActions(data, setCarInputValue)
                  }}
                />
              )}
            />
          <FormErrorMessage>{errors?.car?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.stall}>
          <FormLabel>Stall</FormLabel>
          <Controller
            name='stall'
            control={control}
            rules={{
              required: 'Pilih stall',
            }}
            render={({field}) => (
              <AsyncSelect
                {...field}
                placeholder='Pilih Stall'
                cacheOptions
                loadOptions={promiseStallOptions}
                isClearable
                defaultOptions
              />
            )}
          />
          <FormErrorMessage>{errors?.stall?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.status}>
          <FormLabel>Status</FormLabel>
          <Controller
            name='status'
            control={control}
            rules={{
              required: 'Pilih status service',
            }}
            render={({field}) => (
              <AsyncSelect
                {...field}
                placeholder='Pilih Status'
                cacheOptions
                loadOptions={promiseStatusOptions}
                isClearable
                defaultOptions
              />
            )}
          />
          <FormErrorMessage>{errors?.status?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Note</FormLabel>
          <Input {...register('note')} />
        </FormControl>

      </ModalBody>
      <ModalFooter>
        <Button isDisabled={isSubmitting} type='submit' colorScheme='facebook' mr={3} >
          Simpan
        </Button>
        <Button variant='ghost' onClick={onAllocationFormClose ?? onClose}>Batal</Button>
      </ModalFooter>
    </form>
  )
}
// export default function FormAllocation({ allocation, noContext }) {

//   const {
//     onAllocationFormClose,
//     onClose,
//     handleAddCarActions,
//     carsOptions,
//     statusOptions,
//     stallOptions,
//     // isAllocationFormOpen,
//     // usersOptions,
//   } = noContext ?? useBookingContext()

//   const [formInputs, setFormInputs] = useState({...allocation})
  
//   const handleChange = (e, data) => {
//     const set = (newProp) => setFormInputs((prev) => ({
//       ...prev,
//       ...newProp,
//     }))

//     if ((/[0-9]{2}:[0-9]{2}/).test(e?.target?.value)) {
//       const [ hour, minute ] = e.target.value.split(':')
//       const forTomorrow = new Date()
//       forTomorrow.setDate(forTomorrow.getDate() + 1) /** tomorrow */
//       const date = formInputs.appointment 
//         ? new Date(formInputs.appointment)
//         : forTomorrow
//       date?.setHours(parseInt(hour), parseInt(minute), 0)
//       set({ [e.target.name]: date.toISOString()})
//     }

//     if ('action' in e && 'name' in e) {
//       set({ [e.name]: data?.value ?? '' })
//     }
//   }

//   const {
//     // id_service,
//     id_booking,
//     id_stall,
//     status,
//     note,
//     car,
//   } = formInputs

//   const timeOption = {
//     hour: "numeric",
//     minute: "numeric",
//     hour12: false,
//     timeZone: 'Asia/Jakarta',
//   }

//   const appt = formInputs.appointment
//     ? formatTglWaktu(formInputs.appointment, timeOption)
//     : null

//   // car
//   const selectedCar = carsOptions.find((item) => item.value === car)
//   const [isCarMenuOpen, setCarMenu] = useBoolean()
//   const handleOnInputChange = (inputVal) => inputVal === ''
//     ? setCarMenu.off()
//     : setCarMenu.on()
//   const filterCar = (inputValue) => {
//     const filtered = carsOptions
//       .filter((i) => i.label?.toLowerCase().includes(inputValue.toLowerCase()))
//       .slice(0, 10)
//     return [
//       ...filtered,
//       {
//         value: 'x',
//         label: filtered.length > 0
//           ? `menampilkan ${filtered.length} data dari ${carsOptions.length} data...`
//           : 'mobil tidak ditemukan...',
//         isDisabled: true,
//       }
//     ]
//   }
//   const promiseCarOptions = (inputValue) =>
//     new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(filterCar(inputValue));
//       }, 1000);
//     })

//   // status
//   const selectedStatus = statusOptions.find((item) => item.value === status)
//   const filterStatus = (inputValue) => {
//     return statusOptions.filter((i) =>
//       i.label?.toLowerCase().includes(inputValue.toLowerCase())
//     )
//   }
//   const promiseStatusOptions = (inputValue) =>
//     new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(filterStatus(inputValue));
//       }, 1000);
//     })
  
//   // stall
//   const selectedStall = stallOptions.find((item) => item.value === id_stall)
//   const filterStall = (inputValue) => {
//     return stallOptions.filter((i) =>
//       i.label?.toLowerCase().includes(inputValue.toLowerCase())
//     )
//   }
//   const promiseStallOptions = (inputValue) =>
//     new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(filterStall(inputValue));
//       }, 1000);
//     })

//   return (
//     <>
//       <ModalBody>
//         <form>
//           {id_booking &&
//             <Input type='hidden' name='id_booking' defaultValue={id_booking}/>}
          
//           <FormControl>
//             <FormLabel>Appointment</FormLabel>
//             <Input
//               type='time'
//               name='appointment'
//               w='32'
//               defaultValue={appt !== null ? appt : ''}
//               pattern='[0-9]{2}:[0-9]{2}'
//               onChange={handleChange}
//             />
//           </FormControl>
          
//           <FormControl>
//             <FormLabel>Mobil</FormLabel>
//             {handleAddCarActions 
//               ? <AsyncCreatableSelect
//                   name='car'
//                   placeholder='Pilih Mobil'
//                   defaultValue={selectedCar ?? ''}
//                   cacheOptions
//                   loadOptions={promiseCarOptions}
//                   defaultOptions
//                   isClearable
//                   menuIsOpen={isCarMenuOpen}
//                   onChange={(data, e) => handleChange(e, data)}
//                   onInputChange={handleOnInputChange}
//                   onCreateOption={(inputVal) => {
//                     // console.log(inputVal);
//                     handleAddCarActions(inputVal)
//                   }}
//                 />
//               : <AsyncSelect
//                   name='car'
//                   placeholder='Pilih Mobil'
//                   defaultValue={selectedCar ?? ''}
//                   cacheOptions
//                   loadOptions={promiseCarOptions}
//                   defaultOptions
//                   isClearable
//                   menuIsOpen={isCarMenuOpen}
//                   onChange={(data, e) => handleChange(e, data)}
//                   onInputChange={handleOnInputChange}
//                 />}
//           </FormControl>

//           <FormControl>
//             <FormLabel>Status</FormLabel>
//             <AsyncSelect
//               name='status'
//               placeholder='Pilih Status'
//               defaultValue={selectedStatus ?? ''}
//               cacheOptions
//               loadOptions={promiseStatusOptions}
//               defaultOptions
//               onChange={(data, e) => handleChange(e, data)}
//             />
//           </FormControl>
          
//           <FormControl>
//             <FormLabel>Stall</FormLabel>
//             <AsyncSelect
//               name='id_stall'
//               placeholder='Pilih Stall'
//               defaultValue={selectedStall ?? ''}
//               cacheOptions
//               loadOptions={promiseStallOptions}
//               defaultOptions
//               onChange={(data, e) => handleChange(e, data)}
//             />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Note</FormLabel>
//             <Input name='note' defaultValue={note !== null ? note : ''} />
//           </FormControl>

//         </form>
//       </ModalBody>
//       <ModalFooter>
//         <Button colorScheme='facebook' mr={3} >
//           Simpan
//         </Button>
//         <Button variant='ghost' onClick={onAllocationFormClose ?? onClose}>Batal</Button>
//       </ModalFooter>
//     </>
//   )
// }
