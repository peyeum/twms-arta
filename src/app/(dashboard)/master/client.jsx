'use client'

import { Flex, Heading } from "@chakra-ui/react"

export default function MasterClient() {
  return (
    <Flex
      h='96'
      mt='8'
      p='5'
      justify='center'
      align='center'
      rounded='xl'
      border='1px'
      borderColor='blue.700'
    >
      <Heading size='lg'>Silahkan Pilih Master Data!</Heading>
    </Flex>
  )
}
