import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

export default function HourHeader({hourWidth, rowGap, ...rest}) {
  const hourItems = [8,9,10,11,12,13,14,15,16]
  return (
    <Flex
      gap={rowGap + 'px'}
      {...rest}
    >
      <Box
        w={hourWidth + 'px'}
        bg='blue.700'
        color='gray.100'
        textAlign='center'
        flexShrink='0'
      >
        Jam
      </Box>
      {hourItems.map((item, index) => (
        <HourItem
          key={index}
          w={hourWidth + 'px'}
        >
          {item}
        </HourItem>
      ))}
    </Flex>
  )
}

const HourItem = ({children, ...rest}) => {
  return (
    <Box
      bg='blue.700'
      color='gray.100'
      textAlign='center'
      flexShrink='0'
      {...rest}
    >
      {children}
    </Box>
  )
}
