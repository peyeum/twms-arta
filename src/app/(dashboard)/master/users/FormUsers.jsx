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

export default function FormUsers({ context, ...rest}) {
  const { dataUser: data, onClose } = useContext(context)

  const {
    id_employee,
    nama,
    jabatan,
  } = data ?? {}
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      id_employee,
      nama,
      jabatan,
    }
  })
  const toast = useToast()
  const onSubmit = async (dataForm) => {
    const { id_employee } = dataForm
    if (id_employee) {
      const res = await fetch(`/api/users/${id_employee}`, {
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
    
    const res = await fetch('/api/users', {
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
          {id_employee && <Input {...register('id_employee')} type='hidden' />}
          <FormControl isInvalid={!!errors?.nama}>
            <FormLabel>Nama</FormLabel>
            <Input {...register('nama', {
              required: 'Harap isi nama dengan benar!'
            })} />
            <FormErrorMessage>{errors?.nama?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Jabatan</FormLabel>
            <Input {...register('jabatan')} />
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
