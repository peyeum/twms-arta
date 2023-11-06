'use client'

import { Button, Icon, Tooltip, useBoolean } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { IoLogOutOutline } from "react-icons/io5"

export default function LogoutComp ({ navsize }) {
  const [flag, setFlag] = useBoolean()
  const router = useRouter()
  const handleClick = async () => {
    setFlag.on()
    await fetch('/auth/logout', { method: 'post' })
    router.push('/login')
  }

  return (
    <Tooltip
      label="Logout"
      placement="right"
      isDisabled={navsize === 'small' ? false : true}
    >
      <Button
        display="flex"
        align="center"
        justifyContent='start'
        p="2"
        mb='4'
        mx={navsize === 'small' ? '2' : '4'}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg='none'
        color='current'
        _hover={{
          bg: 'yellow.400',
          color: 'gray.700',
        }}
        mt='2'
        isDisabled={flag}
        onClick={handleClick}
      >
        <Icon
          aria-label='Tombol Menu'
          mr={navsize === 'small' ? '0' : '4'}
          fontSize="3xl"
          as={IoLogOutOutline}
        />
        {navsize === 'small' ? null : 'Logout'}
      </Button>
    </Tooltip>
  )
}