'use client'

import DatePickerCS from "@/components/DatePickerCS"
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { createPrintStyle } from "./printStyle"
import { getSubTitleDate } from "@/app/helper"
import tryFetch from "@/lib/tryFetch"
import { format } from "date-fns"

const contohHarian = [
  {
    pekerjaan: 'QS',
    unit_masuk: 11,
    unit_booking: 6,
    unit_reguler: 5,
    estimasi_service_time_terpenuhi: 10,
  },
  {
    pekerjaan: 'PM',
    unit_masuk: 6,
    unit_booking: 4,
    unit_reguler: 2,
    estimasi_service_time_terpenuhi: 4,
  },
  {
    pekerjaan: 'GR',
    unit_masuk: 4,
    unit_booking: 3,
    unit_reguler: 1,
    estimasi_service_time_terpenuhi: 2,
  },
  {
    pekerjaan: 'TOTAL',
    unit_masuk: 21,
    unit_booking: 13,
    unit_reguler: 8,
    estimasi_service_time_terpenuhi: 16,
  },
]

const HARIAN_TABLE_HEADER = [
  { field: 'category', displayName: 'Kategori'},
  { field: 'overall', displayName: 'Keseluruhan'},
  { field: 'qs', displayName: 'Quick Service'},
  { field: 'pm', displayName: 'Periodical Maintenance'},
  { field: 'gr', displayName: 'General Repair'},
]

// const HARIAN_TABLE_HEADER = [
//   { field: 'pekerjaan', displayName: 'Pekerjaan'},
//   { field: 'unit_masuk', displayName: 'Unit Masuk'},
//   { field: 'unit_booking', displayName: 'Unit Booking'},
//   { field: 'unit_reguler', displayName: 'Unit Non-Booking'},
//   { field: 'estimasi_service_time_terpenuhi', displayName: 'Service Time Sesuai Estimasi'},
// ]

const contohBulanan = [
  {
    tgl: 1,
    unit_masuk: 22,
    quick_service: 11,
    periodical_maintenance: 6,
    general_repair: 5,
    estimasi_service_time_terpenuhi: 16,
  },
  {
    tgl: 2,
    unit_masuk: 22,
    quick_service: 11,
    periodical_maintenance: 6,
    general_repair: 5,
    estimasi_service_time_terpenuhi: 16,
  },
  {
    tgl: 3,
    unit_masuk: 22,
    quick_service: 11,
    periodical_maintenance: 6,
    general_repair: 5,
    estimasi_service_time_terpenuhi: 16,
  },
  {
    tgl: 4,
    unit_masuk: 22,
    quick_service: 11,
    periodical_maintenance: 6,
    general_repair: 5,
    estimasi_service_time_terpenuhi: 16,
  },
  {
    tgl: 5,
    unit_masuk: 22,
    quick_service: 11,
    periodical_maintenance: 6,
    general_repair: 5,
    estimasi_service_time_terpenuhi: 16,
  },
  {
    tgl: 6,
    unit_masuk: 22,
    quick_service: 11,
    periodical_maintenance: 6,
    general_repair: 5,
    estimasi_service_time_terpenuhi: 16,
  },
  {
    tgl: 7,
    unit_masuk: 22,
    quick_service: 11,
    periodical_maintenance: 6,
    general_repair: 5,
    estimasi_service_time_terpenuhi: 16,
  },
  {
    tgl: 8,
    unit_masuk: 22,
    quick_service: 11,
    periodical_maintenance: 6,
    general_repair: 5,
    estimasi_service_time_terpenuhi: 16,
  },
]
// to be changed
const BULANAN_TABLE_HEADER = [
  { field: 'tgl', displayName: 'Tanggal'},
  { field: 'unit_masuk', displayName: 'Unit Masuk'},
  { field: 'quick_service', displayName: 'Unit QS'},
  { field: 'periodical_maintenance', displayName: 'Unit PM'},
  { field: 'general_repair', displayName: 'Unit GR'},
  { field: 'estimasi_service_time_terpenuhi', displayName: 'Service Time Sesuai Estimasi'},
]

export default function LaporanClient({ data }) {
  const [rentangLaporan, setRentangLaporan] = useState('harian')
  const [startDate, setStartDate] = useState(new Date())
  const [printJS, setPrintJS] = useState()

  useEffect(() => {
    (async () => {
      const module = await import('print-js')
      setPrintJS(() => module.default)
    })()
  })

  const createReport = (data, { title, header, rentang, date }) => {
    const [headerHtml, headerStyle] = createPrintStyle(title, getSubTitleDate(rentang, date))

    printJS({
      printable: data,
      properties: header,
      type: 'json',
      header: headerHtml,
      style: headerStyle,
      gridStyle: `
        border: 1px solid #ddd;
        padding-inline: 5px;
        padding-block: 3px;
      `,
    })
  }

  const handleCetak = async () => {

    if (rentangLaporan === 'harian') {
      const dDay = format(startDate, 'yyyy/MM/dd')
      const { report: { data, header }} = await tryFetch(`api/service?r=true&rr=0&d=${dDay}`)
      
      // createReport( contohHarian, {
      createReport( data , {
        title: 'Laporan Harian Service',
        header: header,
        rentang: rentangLaporan,
        date: startDate
      })
    }

    if (rentangLaporan === 'bulanan') {
      // createReport( contohBulanan, {
      //   title: 'Laporan Bulanan Service',
      //   header: BULANAN_TABLE_HEADER,
      //   rentang: rentangLaporan,
      //   date: startDate
      // })
    }

    if (rentangLaporan === 'overall') {}

    // const [headerHtml, headerStyle] = createPrintStyle('Laporan Harian Service', headerDate)
    // printJS({
    //   printable: contoh,
    //   properties: [
    //     { field: 'pekerjaan', displayName: 'Pekerjaan'},
    //     { field: 'unit_masuk', displayName: 'Unit Masuk'},
    //     { field: 'unit_booking', displayName: 'Unit Booking'},
    //     { field: 'unit_reguler', displayName: 'Unit Non-Booking'},
    //     { field: 'estimasi_service_time_terpenuhi', displayName: 'Service Time Sesuai Estimasi'},
    //   ],
    //   type: 'json',
    //   header: headerHtml,
    //   style: headerStyle,
    // })
  }

  return (
    <Flex direction='column' mx='4' my='3' px='2' py='3'>
      <form>
        <Heading size='md'>Cetak Laporan Service</Heading>
        <Stack>
          <FormLabel>Rentang Waktu :</FormLabel>
          <RadioGroup onChange={setRentangLaporan} value={rentangLaporan}>
            <Stack direction='row'>
              <Radio value='harian'>Harian</Radio>
              <Radio value='bulanan'>Bulanan</Radio>
              <Radio value='overall'>Overall</Radio>
            </Stack>
          </RadioGroup>
        </Stack>
        <FormControl>
          <FormLabel>
            Pilih Periode {rentangLaporan === 'bulanan' ? 'Bulan' : 'Tanggal'} :
          </FormLabel>
          <Input
            type='date'
            isRequired
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            maxDate={new Date()}
            dateFormat={rentangLaporan === 'bulanan' ? 'MM/yyyy' : 'dd/MM/yyyy'}
            showMonthYearPicker={rentangLaporan === 'bulanan' ? true : false}
            isReadOnly={rentangLaporan === 'overall' ? true : false}
            as={DatePickerCS}
            />
        </FormControl>
        <ButtonGroup my='2'>
          {/* <Button type='submit' colorScheme='blue'>Cetak</Button> */}
          <Button
            type='button'
            colorScheme='blue'
            onClick={handleCetak}
          >
            Cetak
          </Button>
          {/* <Button type='button' colorScheme='green'>Preview</Button> */}
          <Button type='reset' colorScheme='red'>Reset</Button>
        </ButtonGroup>
      </form>
    </Flex>
  )  
}
