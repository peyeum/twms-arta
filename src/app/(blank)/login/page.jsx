'use client'

import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function Login() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()
  const toast = useToast()
  const onSubmit = async (data) => {
    const res = await fetch('/auth/login', {
      method: 'post',
      body: JSON.stringify(data),
    })
    const { error } = await res.json()

    if (error) {
      toast({
        title: 'Username atau Password salah!',
        isClosable: true,
        status: 'error'
      })
      return reset()
    }
    router.push('/')
  }
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex flex={1} maxHeight={'100vh'} maxWidth={'50vw'} position={'relative'}>
        <Image
          alt={'Login Image'}
          fill={'true'}
          objectFit={'cover'}
          src={'/login-img.jpg'}
        />
      </Flex>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Flex
              gap={'1rem'}
              direction={'column'}
              align={'center'}
              marginBlockEnd={'3rem'}
            >
              <Text fontSize={'xl'} fontWeight={'bold'}>TWMS Honda Arta</Text>
              <Box position={'relative'} width={75} height={75}>
                <Image
                  alt='company logo'  
                  src={'/comp-logo.png'}
                  fill={'true'}
                  objectFit={'cover'}
                />
              </Box>
            </Flex>
            <FormControl id="username" isInvalid={!!errors?.username}>
              <FormLabel>Username</FormLabel>
              <Input
                {...register('username', {
                  required: 'Harap masukan username',
                })}
                type="text"
                // autoComplete='off'
              />
              <FormErrorMessage>
                {errors?.username?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={!!errors?.password}>
              <FormLabel>Password</FormLabel>
              <Input
                {...register('password', {
                  required: 'Password jangan dikosongkan',
                })}
                type="password"
              />
              <FormErrorMessage>
                {errors?.password?.message}
              </FormErrorMessage>
            </FormControl>
            <Stack spacing={6}>
              <Button
                colorScheme={'telegram'}
                variant={'solid'}
                type='submit'
                isDisabled={isSubmitting}
              >
                LOGIN
              </Button>
            </Stack>
          </Stack>
        </form>
      </Flex>
    </Stack>
  )
}