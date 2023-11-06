'use client'

import { wait } from "@/app/helper"
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react"
import { AsyncSelect } from "chakra-react-select"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { useForm, Controller } from "react-hook-form"

export default function FormStalls({ context, userOptions, ...rest}) {
  const { dataStall: data, onClose } = useContext(context)

  const {
    id_stall,
    nama_stall,
    status,
    stall_pic,
  } = data ?? {}

  const router = useRouter()

  const selectedPic = stall_pic?.split(' - ').map((pic) => {
    return userOptions.find((item) => item.label === pic)
  })
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      id_stall,
      nama_stall,
      status,
      user: selectedPic ?? []
    }
  })
  const toast = useToast()
  const onSubmit = async (dataForm) => {
    const { id_stall } = dataForm
    if (id_stall) {
      const res = await fetch(`/api/stalls/${id_stall}`, {
        method: 'put',
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
          title: data,
          isClosable: true,
          status: 'success'
        })
        await wait(500)
        router.refresh()
        onClose()
      }  
      return
    }
    
    const res = await fetch('/api/stalls', {
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
        title: data,
        isClosable: true,
        status: 'success'
      })
      await wait(500)
      router.refresh()
      reset()
      onClose()
    }
  }

  const filterUsers = (inputValue) => {
    return userOptions.filter((i) =>
      i.label?.toLowerCase().includes(inputValue.toLowerCase())
    )
  }
  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterUsers(inputValue));
      }, 1000);
    })

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
            {id_stall && <Input {...register('id_stall')} type='hidden' />}
            <FormControl isInvalid={!!errors?.nama_stall}>
              <FormLabel>Nama Stall</FormLabel>
              <Input {...register('nama_stall', {
                required: 'Masukkan nama stall'
              })}
                type='text'
              />
              <FormErrorMessage>
                {errors?.nama_stall?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Input {...register('status')} type='text'/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>PIC</FormLabel>
              <Controller
                name='user'
                control={control}
                render={({field}) => (
                  <AsyncSelect
                    {...field}
                    placeholder='Pilih PIC Stall'
                    cacheOptions
                    loadOptions={promiseOptions}
                    defaultOptions
                    isMulti
                  />
                )}
              />
            </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button isDisabled={isSubmitting} type='submit' colorScheme='facebook' mr={3} >
            Simpan
          </Button>
          <Button variant='ghost' onClick={onClose}>Batal</Button>
        </ModalFooter>
      </form>
  )
}
