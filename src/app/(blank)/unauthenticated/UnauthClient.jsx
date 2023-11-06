'use client'

import { Box, Text, Button } from '@chakra-ui/react'
import { WarningTwoIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

export default function UnauthClient() {
  const router = useRouter()
  const loginButtonRef = useRef()
  const handleClick = () => {
    loginButtonRef.current.blur()
    loginButtonRef.current.disabled = true
    router.push('/login')
  }

  return (
    <Box textAlign="center" py={10} px={6}>
      <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
      <Text fontSize="18px" mt={3} mb={2}>
        Belum Login!
      </Text>
      <Text color={'gray.500'} mb={6}>
        Silahkan login sebelum masuk ke aplikasi
      </Text>

      <Button
        colorScheme="linkedin"
        color="white"
        variant="solid"
        onClick={handleClick}
        ref={loginButtonRef}
      >
        Login
      </Button>
    </Box>
  )
}
