'use client'

import {
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react"
import { calcBookingAllocation, formatTglWaktu, getOptionLabel, subFirstTwoWords } from "@/app/helper"
import TableActionCell from "../TableActionCell"
import { useEffect } from "react"
import { BookingContext, useBookingContext } from "@/app/(dashboard)/booking/context"

const statusColor = {
  'arrived': 'gray.800, gray.900',
  'waiting': 'red.600, red.500',
}

export default function StallAllocation({ data, dataCount, children, ...rest }) {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const {
    isModalOpenGlobal,
    setIsModalOpenGlobal,
    carsOptions,
    statusOptions,
  } = useBookingContext()

  const getCar = (value) => getOptionLabel(value, carsOptions)
  const getStatus = (value) => getOptionLabel(value, statusOptions)

  const { appointment, id_mobil, car: { model } } = data

  const { marginLength, widthLength } = calcBookingAllocation(appointment)

  const statusBgColor = statusColor[data.status] ?? 'green.500, green.400'

  useEffect(() => {
    isOpen ? setIsModalOpenGlobal(true) : setIsModalOpenGlobal(false)
  }, [isOpen])
  
  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Flex
          h='80%'
          bgGradient={`linear(to-r, ${statusBgColor})`}
          pos='absolute'
          left={marginLength}
          w={widthLength}
          align='center'
          px='4'
          border='1px'
          borderColor='gray.700'
          rounded='sm'
          order='0'
          cursor='pointer'
          _hover={{
            shadow: 'md',
            bg: `${statusBgColor.split(',')[0]}`,
            zIndex: !isModalOpenGlobal ? '50' : ''
          }}
          zIndex={isOpen && '50'}
        >
          <Tooltip
            label={getCar(id_mobil)}
          >
            <Text
              noOfLines={1}
              fontSize='sm'
            >
              {`${getCar(id_mobil)} - `}
            </Text>
          </Tooltip>
        </Flex>
      </PopoverTrigger>
      <Portal>
        <PopoverContent bg='blue.700' color='gray.200' shadow='md'>
          <PopoverArrow bg='blue.700' />
          <PopoverHeader>
            {getCar(id_mobil)}
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Stack>
              <ServiceItem label='Model' item={subFirstTwoWords(model)} />
              {Object.keys(data).map((key, i) => {
                const keyName = key.toString()
                if (!data[key]) return ''
                if (![
                  'appointment',
                  'status',
                  'note',
                ].includes(keyName)) return ''
                
                let label = '-'
                let item = '-'
                label = keyName
                item = data[key]

                if (keyName.includes('status')) {
                  item = getStatus(data[key])
                }

                if (keyName.includes('appointment')) {
                  const option = {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                    timeZone: 'Asia/Jakarta',
                  }

                  const time = formatTglWaktu(data[key], option)
                  item = time
                }

                label = `${label.at(0).toUpperCase()}${label.slice(1)}`

                return (
                  <ServiceItem
                    key={i}
                    label={label}
                    item={item}
                  />
                )
              })}
            </Stack>
          </PopoverBody>
          <PopoverFooter>
            <Flex align='center' justify='space-between'>
              <span></span>
              <TableActionCell
                data={data}
                context={BookingContext}
                bg='gray.100'
                rounded='sm'
                onClick={onClose}
              />
            </Flex>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

const ServiceItem = ({label, item}) => (
  <Flex>
    <Text minW='5.25rem' fontWeight='500'>{label}</Text>
    <Text mx='2'>:</Text>
    <Text>{item}</Text>
  </Flex>
)

