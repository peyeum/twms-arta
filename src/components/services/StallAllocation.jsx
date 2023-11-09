'use client'

import {
  Box,
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
  useDisclosure,
} from "@chakra-ui/react"
import { calcAlocation, formatTglWaktu, getOptionLabel, isISODateString, subFirstTwoWords } from "../../app/helper"
import TableActionCell from "../TableActionCell"
import { useEffect } from "react"
import { ServiceContext, useServiceContext } from "@/app/(dashboard)/service/context"
import { SERVICE_STATUS_COLORS } from "@/app/consts"

const statusColor = SERVICE_STATUS_COLORS

export default function StallAllocation({ data, dataCount, children, ...rest }) {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const {
    isModalOpenGlobal,
    setIsModalOpenGlobal,
    usersOptions,
    carsOptions,
    statusOptions,
  } = useServiceContext()

  const {
    saOptions,
    foremanOptions,
    teknisiOptions,
  } = usersOptions

  const getSa = (value) => getOptionLabel(value, saOptions)
  const getForeman = (value) => getOptionLabel(value, foremanOptions)
  const getTeknisi = (arrOfValue) => arrOfValue.map((value) => getOptionLabel(value, teknisiOptions))
  const getCar = (value) => getOptionLabel(value, carsOptions)
  const getStatus = (value) => getOptionLabel(value, statusOptions)

  const {
    mulai,
    estimasi_waktu,
    selesai,
    id_mobil: carId,
    service_advisor: saId,
    foreman: foremanId,
    teknisi,
    cars: { model },
  } = data

  const {
    marginLength,
    widthLength,
  } = calcAlocation({ startTime: mulai, endTime: selesai ?? estimasi_waktu})
  
  const listIdTeknisi = teknisi.map((teknisi) => teknisi.id_employee)
  const statusBgColor = statusColor[data.status] ?? 'green.500, green.400'
  const propToDisplayInPopUp = ['status', 'mulai', 'estimasi_waktu', 'selesai', 'kilometer', 'note']

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
          <Text
            noOfLines={1}
          >
            {`${getCar(carId)} - ${getSa(saId)}`}
          </Text>
        </Flex>
      </PopoverTrigger>
      <Portal>
        <PopoverContent bg='blue.700' color='gray.200' shadow='md' >
          <PopoverArrow bg='blue.700' />
          <Box maxH='16.75rem' overflowY='auto' >
            <PopoverHeader>{`${getCar(carId)} - SA ${getSa(saId)}`}</PopoverHeader>
            <PopoverCloseButton mr='4' />
            <PopoverBody>
              <Stack>
                <ServiceItem
                  key='car-model-name'
                  label='Model'
                  item={subFirstTwoWords(model)}
                />
                {propToDisplayInPopUp.map((keyName, i) => {
                  let label = '-'
                  let item = '-'
                  label = keyName
                  item = data[keyName]
                  if (keyName.includes('status')) {
                    item = getStatus(data[keyName])
                  }
                  if (isISODateString(data[keyName])) {
                    const option = {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false,
                      timeZone: 'Asia/Jakarta',
                    }
                    const time = formatTglWaktu(data[keyName], option)
                    item = time ?? '-'
                    switch (keyName) {
                      case 'mulai':
                        label = 'mulai'
                        break
                      case 'selesai':
                        label = 'selesai'
                        break;
                      case 'estimasi_waktu':
                        label = 'estimasi selesai'
                        break;
                      default:
                        break;
                    }
                  }
                  label = `${label.at(0).toUpperCase()}${label.slice(1)}`
                  return <ServiceItem key={i} label={label} item={item} />
                })}
              </Stack>
            </PopoverBody>
            <PopoverFooter>
              <Flex align='center' justify='space-between'>
                {`${getForeman(foremanId)} - ${getTeknisi(listIdTeknisi).join(', ')}`}
                <TableActionCell
                  data={data}
                  context={ServiceContext}
                  bg='gray.100'
                  rounded='sm'
                  onClick={onClose}
                />
              </Flex>
            </PopoverFooter>
          </Box>
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
