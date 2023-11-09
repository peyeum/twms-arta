'use client'
import { SERVICE_STATUS_COLORS, SERVICE_STATUS_OPTIONS } from '@/app/consts'
import { Box, Flex, Stack } from '@chakra-ui/react'
import React from 'react'

const statusOptions = SERVICE_STATUS_OPTIONS
const statusColor = SERVICE_STATUS_COLORS
export default function StatusColorGuide() {
  const borderBox = '2.4px solid #333'
  return (
    <Stack mt='8' w='min-content'>
      <Box textAlign='center'>Petunjuk Warna Status Unit Service</Box>
      <Stack border={borderBox} borderBottom='none' w='min-content' bg='gray.100' gap='0' >
        <Flex borderBottom={borderBox} bg='blue.700' fontWeight='bold' color='gray.100' >
          <Box w='40' py='2' pl='2' borderRight={borderBox} >Status</Box>
          <Box w='32' py='2' pl='2' >Warna</Box>
        </Flex>
        {statusOptions.map((status, index) => (
          <CustomRow
            key={status?.value}
            label={status?.label}
            color={statusColor[status?.value]}
            border={borderBox}
          />
          ))}
      </Stack>
    </Stack>
  )
}

const CustomRow = ({ label, color, border, ...rest }) => {
  // if (!labels || !Array.isArray(labels) || labels?.length !== 2) return null
  return (
    <Flex borderBottom={border}>
      <Box w='40' py='2' pl='2' borderRight={border} >{label}</Box>
      <Box
        w='32'
        py='2'
        px='2'
      >
        <Box
          bgGradient={`linear(to-r, ${color})`}
          h='6'
        ></Box>
      </Box>
    </Flex>
  )
}
