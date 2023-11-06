'use client'

import {
  Divider,
  Flex,
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  StatGroup,
  Text,
} from '@chakra-ui/react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import React from 'react'

const date = Intl.DateTimeFormat(
  'id-ID',
  { dateStyle: 'full', timeZone: 'Asia/Jakarta' }
  ).format(new Date())

// const dataUnitList = [
//   {
//     // label: 'Unit Masuk',
//     label: date,
//     text: [
//       'Unit Service : 11 Unit',
//       'Unit Booking : 12 Unit',
//     ],
//     helper: 'test',
//     // helper: date,
//   },
//   {
//     label: 'Unit Booking',
//     text: '11 Unit',
//     helper: '56%',
//     arrow: 'increase',
//   },
// ]

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function DashboardClient({
  lastSevenDayServicesSum,
  todayAllocationsSum,
  dataUnitList,
}) {
  return (
    <Stack>
      <StatGroup>
        {dataUnitList.map((data, index) => <StatWrapper key={`stat-${index}`} {...data}/>)}
      </StatGroup>
      <Flex justify='space-evenly'>
        <PieChartWrapper
          text='Persebaran Unit Masuk Hari Ini'
          data={todayAllocationsSum}
        />
        <BarChartWrapper
          text='Unit Masuk Service di 7 Hari Terakhir'
          data={lastSevenDayServicesSum}
        />
      </Flex>

    </Stack>
  )
}

const StatWrapper = ({ label, text, helper, arrow }) => (
  <Stat
    bg='blue.700'
    color='gray.100'
    px='2'
    py='4'
    m='4'
    rounded='lg'
  >
    <StatLabel mx='3' >{label}</StatLabel>
    <Divider my='2' />
    {text?.length > 0 && Array.isArray(text) 
      ? text.map((t, index) => (<StatNumber key={index} mx='3' >{t}</StatNumber>))
      : <StatNumber mx='3' >{text}</StatNumber>}
    <StatHelpText mx='3' >
      {helper}
      {arrow && <StatArrow type={arrow === 'increase' ? 'increase' : 'decrease'} />}
    </StatHelpText>
  </Stat>
)

const BarChartWrapper = ({ text, data }) => (
  <Stack align='center'>
    <span>{text}</span>
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="unit" fill="#2c5282" background={{ fill: '#eee' }} />
    </BarChart>
  </Stack>
)

const PieChartWrapper = ({ text, data }) => (
  <Stack align='center'>
    <span>{text}</span>
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </Stack>
)
