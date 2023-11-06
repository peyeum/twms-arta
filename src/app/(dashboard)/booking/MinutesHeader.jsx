import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

export default function MinutesHeader({hourWidth, rowGap, minuteWidth, ...rest}) {
  const minuteItems = [0,15,30,45]
  return (
    <Flex gap={rowGap + 'px'} >
      <Box
        w={hourWidth + 'px'}
        bg='blue.700'
        color='gray.100'
        textAlign='center'
        flexShrink='0'
        {...rest}
      >
        Menit
      </Box>
      {Array.from({length: 9}).map((_, index) => {
        return (
          <Flex
            key={index}
            gap={rowGap + 'px'}
            flexShrink='0'
            w={hourWidth + 'px'}
          >
            {minuteItems.map((item, i) => (
              <MinuteItem
                key={i}
                w={minuteWidth + rowGap - 1.5 + 'px'}
              >
                {item}
              </MinuteItem>
            ))}
          </Flex>
        )
      })}
    </Flex>
  )
}

const MinuteItem = ({children, ...rest}) => {
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