'use client'
import React from 'react'
import { useServiceContext } from './context'
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
import { customPickBy, getOption, isEmptyObject, wait } from '@/app/helper'
import { useForm, Controller } from "react-hook-form"
import { useRouter } from 'next/navigation'
import DatePickerSP from '@/components/DatePickerSP'

export default function FormAllocation({ allocation, noContext }) {

  const {
    onAllocationFormClose,
    onClose,
    isAllocationFormOpen,
    handleAddCarActions,
    setClientCarOptions,
    usersOptions,
    carsOptions,
    statusOptions,
    stallOptions,
  } = noContext ?? useServiceContext()
  
  const {
    saOptions,
    foremanOptions,
    teknisiOptions,
  } = usersOptions

  const {
    id_service,
    id_stall,
    // id_booking,
    status,
    kilometer,
    note,
    id_mobil,
    tgl_service,
    mulai,
    estimasi_waktu,
    selesai,
    service_advisor,
    foreman,
    teknisi,
  } = allocation

  const router = useRouter()
  const defaultStatus = { value: 'onprogress', label: 'On Progress'}

  const listIdTeknisi = teknisi?.map((teknisi) => teknisi.id_employee)
  const getTeknisi = (arrOfValue) => arrOfValue?.map((value) => getOption(value, teknisiOptions))
  const selectedTeknisi = getTeknisi(listIdTeknisi)

  const selectedCar = getOption(id_mobil, carsOptions)
  const selectedStatus = getOption(status, statusOptions)
  const selectedStall = getOption(id_stall, stallOptions)
  const selectedSa = getOption(service_advisor, saOptions)
  const selectedForeman = getOption(foreman, foremanOptions)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting, dirtyFields },
    reset,
  } = useForm({
    defaultValues: {
      id_service: id_service ?? undefined,
      tgl_service: tgl_service ? new Date(tgl_service) : new Date(),
      start_time: mulai ? new Date(mulai) : new Date(),
      estimated_time: estimasi_waktu ? new Date(estimasi_waktu) : undefined,
      end_time: selesai ? new Date(selesai) : undefined,
      kilometer: kilometer ?? '',
      note: note ?? '',
      car: selectedCar ?? undefined,
      stall: selectedStall ?? undefined,
      status: selectedStatus ?? defaultStatus,
      service_advisor: selectedSa ?? undefined,
      foreman: selectedForeman ?? undefined,
      teknisi: selectedTeknisi ?? undefined,
    }
  })
  const toast = useToast()
  const onSubmit = async (dataForm) => {
    const { id_service } = dataForm
    if (id_service) {
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

      const res = await fetch(`/api/service/${id_service}`, {
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

    const res = await fetch('/api/service', {
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
    setClientCarOptions((prev) => [...prev, data])
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
  
  // sa
  const filterSa = (inputValue) => {
    return saOptions.filter((i) =>
      i.label?.toLowerCase().includes(inputValue.toLowerCase())
    )
  }
  const promiseSaOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterSa(inputValue));
      }, 1000);
    })

  // foreman
  const filterForeman = (inputValue) => {
    return foremanOptions.filter((i) =>
      i.label?.toLowerCase().includes(inputValue.toLowerCase())
    )
  }
  const promiseForemanOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterForeman(inputValue));
      }, 1000);
    })
  
  // teknisi
  const filterTeknisi = (inputValue) => {
    return teknisiOptions.filter((i) =>
      i.label?.toLowerCase().includes(inputValue.toLowerCase())
    )
  }
  const promiseTeknisiOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterTeknisi(inputValue));
      }, 1000);
    })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
          {id_service &&
            <Input type='hidden' {...register('id_service')} />}
          
          <FormControl isInvalid={!!errors.tgl_service}>
            <FormLabel>Tanggal</FormLabel>
            <Controller
              name='tgl_service'
              control={control}
              rules={{
                required: 'Tentukan tanggal service',
              }}
              render={({field: { onChange, onBlur, value, ref }}) => (
                <Input
                  type='date'
                  maxDate={new Date()}
                  dateFormat='dd/MM/yyyy'
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  as={DatePickerCS}
                />
              )}
            />
            <FormErrorMessage>{errors?.tgl_service?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.start_time}>
            <FormLabel>Mulai</FormLabel>
            <Controller
              name='start_time'
              control={control}
              rules={{
                required: 'Tentukan waktu mulai service',
                pattern: /[0-9]{2}:[0-9]{2}/i,
              }}
              render={({field: { onChange, onBlur, value, ref }}) => (
                <DatePickerSP
                  type='time'
                  w='20'
                  maxDate={new Date()}
                  dateFormat='HH:mm'
                  timeFormat="HH:mm"
                  timeIntervals={2}
                  timeCaption="Jam"
                  timeMin='08:00'
                  timeMax='16:59'
                  showTimeSelect
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                />
              )}
            />
            <FormErrorMessage>{errors?.start_time?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.estimated_time}>
            <FormLabel>Estimasi Selesai</FormLabel>
            <Controller
              name='estimated_time'
              control={control}
              rules={{
                required: 'Tentukan estimasi waktu selesai service',
                pattern: /[0-9]{2}:[0-9]{2}/i,
              }}
              render={({field: { onChange, onBlur, value, ref }}) => (
                <DatePickerSP
                  type='time'
                  w='20'
                  maxDate={new Date()}
                  dateFormat='HH:mm'
                  timeFormat="HH:mm"
                  timeIntervals={2}
                  timeCaption="Jam"
                  timeMin='08:00'
                  timeMax='16:59'
                  showTimeSelect
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                />
              )}
            />
            <FormErrorMessage>{errors?.estimated_time?.message}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Selesai</FormLabel>
            <Controller
              name='end_time'
              control={control}
              rules={{
                pattern: /[0-9]{2}:[0-9]{2}/i,
              }}
              render={({field: { onChange, onBlur, value, ref }}) => (
                <DatePickerSP
                  type='time'
                  w='20'
                  maxDate={new Date()}
                  dateFormat='HH:mm'
                  timeFormat="HH:mm"
                  timeIntervals={2}
                  timeCaption="Jam"
                  timeMin='08:00'
                  timeMax='16:59'
                  showTimeSelect
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                />
              )}
            />
          </FormControl>

          <FormControl isInvalid={!!errors.car}>
            <FormLabel>Mobil</FormLabel>
              <Controller
                name='car'
                control={control}
                rules={{
                  required: 'Pilih mobil yang akan diservice',
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
          
          <FormControl isInvalid={!!errors.service_advisor}>
            <FormLabel>Service Advisor</FormLabel>
            <Controller
              name='service_advisor'
              control={control}
              rules={{
                required: 'Pilih Service Advisor',
              }}
              render={({field}) => (
                <AsyncSelect
                  {...field}
                  placeholder='Pilih Service Advisor'
                  cacheOptions
                  loadOptions={promiseSaOptions}
                  isClearable
                  defaultOptions
                />
              )}
            />
            <FormErrorMessage>{errors?.service_advisor?.message}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={!!errors.foreman}>
            <FormLabel>Foreman</FormLabel>
            <Controller
              name='foreman'
              control={control}
              rules={{
                required: 'Pilih Foreman',
              }}
              render={({field}) => (
                <AsyncSelect
                  {...field}
                  placeholder='Pilih Foreman'
                  cacheOptions
                  loadOptions={promiseForemanOptions}
                  isClearable
                  defaultOptions
                />
              )}
            />
            <FormErrorMessage>{errors?.foreman?.message}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={!!errors.teknisi}>
            <FormLabel>Teknisi</FormLabel>
            <Controller
              name='teknisi'
              control={control}
              rules={{
                required: 'Pilih Teknisi',
              }}
              render={({field}) => (
                <AsyncSelect
                  {...field}
                  placeholder='Pilih Teknisi'
                  isMulti
                  cacheOptions
                  loadOptions={promiseTeknisiOptions}
                  defaultOptions
                />
              )}
            />
            <FormErrorMessage>{errors?.teknisi?.message}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Kilometer</FormLabel>
            <Input
              type='number'
              {...register('kilometer')}
            />
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
