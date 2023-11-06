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
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { useForm } from "react-hook-form"

export default function FormCustomer({ context, ...rest}) {
  const { dataCustomer: data, onClose } = useContext(context)
  const {
    id_customer,
    nama,
    alamat,
  } = data ?? {}

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      id_customer,
      nama,
      alamat,
    }
  })
  const toast = useToast()
  const onSubmit = async (dataForm) => {
    const { id_customer } = dataForm
    if (id_customer) {
      const res = await fetch(`/api/customers/${id_customer}`, {
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
    
    const res = await fetch('/api/customers', {
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
          {id_customer && <Input type='hidden' {...register('id_customer')} />}
          <FormControl isInvalid={!!errors?.nama}>
            <FormLabel>Nama</FormLabel>
            <Input {...register('nama', {
              required: 'Harap input nama customer!',
            })} />
            <FormErrorMessage>{errors?.nama?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Alamat</FormLabel>
            <Input {...register('alamat')} />
          </FormControl>

      </ModalBody>
      <ModalFooter>
        <Button type='submit' colorScheme='facebook' mr={3} isDisabled={isSubmitting} >
          Simpan
        </Button>
        <Button variant='ghost' onClick={onClose}>Batal</Button>
      </ModalFooter>
    </form>
  )
}
