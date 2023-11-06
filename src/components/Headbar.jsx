'use client'

import Image from 'next/image'
import {
  Box,
  Flex,
} from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
const menu = {
  '/': 'Dasbor',
  '/master': 'Master Data',
  '/master/mobil': 'Master Data Mobil',
  '/master/customers': 'Master Data Customer',
  '/master/users': 'Master Data User',
  '/master/stalls': 'Master Data Stall',
  '/service': 'Service',
  '/service/riwayat': 'Riwayat Service',
  '/booking': 'Booking',
  '/booking/riwayat': 'Riwayat Booking',
  '/laporan': 'Laporan Service',
}

export default function Headbar({...rest}) {
  return (
    <Flex
      bg='gray.100'
      h='12'
      pl='4'
      pr='1'
      mb='2'
      ml='2'
      borderBottomStartRadius='xl'
      alignItems='center'
      justifyContent='space-between'
      as='nav'
      {...rest}
    >
      <Box>
        {menu[usePathname()] ?? 'TWMS'}
      </Box>
      <Flex alignItems={'center'}>
          <Box fontWeight='medium'>Total Workshop Management System - Honda Arta</Box>
          <Box position={'relative'} boxSize='10' mx='1'>
            <Image
              alt='company logo'  
              src={'/comp-logo.png'}
              fill={'true'}
              sizes='full'
            />
          </Box>
      </Flex>
    </Flex>
  )
}