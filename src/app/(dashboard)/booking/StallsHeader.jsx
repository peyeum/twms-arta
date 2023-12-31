import {
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useBookingContext } from './context'
import StallItem from '@/components/booking/StallItem'
import { sortStalls } from '@/app/helper'

export default function StallsHeader({ dataStalls, dataAllocations, children, ...rest}) {
  const { hourWidth, rowGap } = useBookingContext()
  const stallsHeaderWidth = hourWidth / 3
  const widthTolerance = hourWidth - stallsHeaderWidth
  const stallsWithAllocations = dataStalls.map((stall) => {
    const allocations = dataAllocations.filter((allocation) => {
      return allocation.id_stall === stall.id_stall
    })
    return {
      ...stall,
      allocations
    }
  })
  const sortedAllocations = sortStalls(stallsWithAllocations)
  return (
    <Flex
      {...rest}
      gap={rowGap + 'px'}
    >
      <Flex
        w={stallsHeaderWidth + 'px'}
        bg='blue.700'
        color='gray.100'
        align='center'
        justify='center'
        flexShrink='0'
      >
        <Text flexShrink='0' transform='rotate(-90deg)' >Stall</Text>
      </Flex>
      <Stack gap={rowGap + 'px'} pos='relative'>
        {sortedAllocations.map((stall) => (
          <StallItem
            w={widthTolerance - rowGap + 'px'}
            key={stall.id_stall}
            dataStall={stall}
          />
        ))}
      </Stack>
    </Flex>
  )
}
