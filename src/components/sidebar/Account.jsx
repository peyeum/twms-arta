'use client'
import { Avatar, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export default function Account({ navsize, username, role }) {
  return (
    <HStack
      p='2'
      h='20'
      mx={navsize === 'small' ? '2' : '4'}
      mt='2'
      mb='14'
      border={navsize === 'small' ? 'none' : '1px'}
      borderStyle='dashed'
      borderColor='gray.100'
      rounded='lg'
    >
      <Avatar
        size={'sm'}
        src='/avatar.jpg'
      />
      <VStack
        display={navsize === 'small' ? 'none' : 'flex'}
        alignItems="flex-start"
        spacing="1px"
        ml="2"
      >
        <Text fontSize="sm">{username.toUpperCase()}</Text>
        <Text fontSize="xs">{role.toUpperCase()}</Text>
      </VStack>
    </HStack>
  )
}
