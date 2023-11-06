'use client'

import { useServiceContext } from "@/app/(dashboard)/service/context"
import { Flex } from "@chakra-ui/react"
import StallTimeLine from "./StallTimeLine"

export default function StallItem({ dataStall, children, ...rest }) {
  const { hourWidth, rowGap } = useServiceContext()
  return (
    <Flex gap={rowGap + 'px'}>
      <Flex
        bg='blue.700'
        color='gray.100'
        align='center'
        justify='center'
        flexShrink='0'
        h='40px'
        {...rest}
      >
        {dataStall.nama_stall}
      </Flex>
      <StallTimeLine
        w={hourWidth * 9 + rowGap * 8 + 'px'}
        data={dataStall.allocations}
      />
    </Flex>
  )
}
