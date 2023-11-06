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

export default function FormMobil({ context, ownerOptions, ...rest}) {
  const { dataMobil: data, onClose } = useContext(context)

  const {
    id_mobil,
    nopol,
    model,
    id_customer,
  } = data ?? {}

  const router = useRouter()
  const customer = ownerOptions.find((item) => item.value === id_customer)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      id_mobil,
      nopol,
      model,
      customer,
    }
  })
  const toast = useToast()
  const onSubmit = async (dataForm) => {
    const { id_mobil } = dataForm
    if (id_mobil) {
      const res = await fetch(`/api/cars/${id_mobil}`, {
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


  const filterOwners = (inputValue) => {
    return ownerOptions.filter((i) =>
      i.label?.toLowerCase().includes(inputValue.toLowerCase())
    )
  }
  
  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterOwners(inputValue));
      }, 1000);
    })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
          {id_mobil && <Input type='hidden' {...register('id_mobil')}/>}
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

          <FormControl mt={4} isInvalid={!!errors?.customer}>
            <FormLabel>Owner</FormLabel>
              <Controller
                name='customer'
                control={control}
                render={({field}) => (
                  <AsyncSelect
                    {...field}
                    placeholder='Pilih Owner'
                    cacheOptions
                    loadOptions={promiseOptions}
                    defaultOptions
                  />
                )}
              />
            <FormErrorMessage>{errors?.customer?.message}</FormErrorMessage>
          </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button type='submit' isDisabled={isSubmitting} colorScheme='facebook' mr={3} >
          Simpan
        </Button>
        <Button variant='ghost' onClick={onClose}>Batal</Button>
      </ModalFooter>
    </form>
  )
}
