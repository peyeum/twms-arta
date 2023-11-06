'use client'

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
import { useServiceContext } from "./context"
import { useForm } from "react-hook-form"
import { wait } from "@/app/helper"

export default function FormMobil() {
  const {
    platnopol: nopol,
    onCarFormClose,
    carValueCallbackSetter,
  } = useServiceContext()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      nopol,
      model: '',
    }
  })
  const toast = useToast()
  const onSubmit = async (dataForm) => {
    const res = await fetch('/api/cars', {
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
        title: 'Data berhasil ditambahkan',
        isClosable: true,
        status: 'success'
      })
      const [ createdCar ] = data
      const createdCarOptions = {
        value: createdCar.id_mobil,
        label: createdCar.nopol,
      }
      carValueCallbackSetter(createdCarOptions)
      await wait(300)
      reset()
      onCarFormClose()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
          <FormControl isInvalid={!!errors?.nopol}>
            <FormLabel>Plat Nomor Polisi</FormLabel>
            <Input {...register('nopol', {
              required: 'Nopol jangan dikosongkan'
            })} />
            <FormErrorMessage>{errors?.nopol?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors?.model} >
            <FormLabel>Model</FormLabel>
            <Input {...register('model', {
              required: 'Model jangan dikosongkan'
            })} />
            <FormErrorMessage>{errors?.model?.message}</FormErrorMessage>
          </FormControl>

      </ModalBody>
      <ModalFooter>
        <Button type='submit' isDisabled={isSubmitting} colorScheme='facebook' mr={3} >
          Simpan
        </Button>
        <Button variant='ghost' onClick={onCarFormClose}>Batal</Button>
      </ModalFooter>
    </form>
  )
}
