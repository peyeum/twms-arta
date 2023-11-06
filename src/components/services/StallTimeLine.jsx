'use client'

import { Flex } from "@chakra-ui/react"
import StallAllocation from "./StallAllocation"
import { useServiceContext } from "@/app/(dashboard)/service/context"

export default function StallTimeLine({data, children, ...rest}) {
  const { rowGap, minuteWidth } = useServiceContext()
  const tblback = 'gray.200'
  const tblWht = 'whiteAlpha.50'
  data = data ?? []
  const dataCount = data.length - 1
  return (
    <Flex
      bgGradient={`repeating-linear-gradient(to-r, ${tblback} 0px, ${tblback} ${minuteWidth + 0.5}px, ${tblWht} ${minuteWidth + 0.5}px, ${tblWht} ${minuteWidth + 0.5 + rowGap}px)`}
      color='gray.100'
      align='center'
      flexShrink='0'
      h='40px'
      pos='relative'
      py='1'
      {...rest}
    >
      {data.map((allocation, index) => {
        return (
          <StallAllocation key={index} data={allocation} dataCount={dataCount} />
        )
      })}
    </Flex>
  )
}
