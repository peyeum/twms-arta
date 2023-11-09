'use client' /* wrapping react-date-picker using chakra-ui */

import React, { useState } from 'react'
import DatePickerCS from './DatePickerCS'
import { Input } from '@chakra-ui/react'
import { set } from 'date-fns'

export default function DatePickerSP({ timeMin, timeMax, ...props}) {
  const [ time ] = useState(() => getTime)
  return (
    <Input 
      as={DatePickerCS}
      minTime={timeMin && time(timeMin)}
      maxTime={timeMax && time(timeMax)}
      {...props}
    />
  )
}

/**
 * Returns a new Date object with the hours and minutes set to the specified time.
 * @param {string} timeString - The time string in the format "HH:MM".
 * @returns {Date} A new Date object with the hours and minutes set to the specified time.
 * @throws {Error} If the time string is not in the format "HH:MM".
 */
const getTime = (timeString) => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
  if (!timeRegex.test(timeString)) {
    throw new Error('Invalid time string format. Expected format: HH:MM')
  }
  const [hours, minutes] = timeString.split(':')
  const hoursNum = Number(hours)
  const minutesNum = Number(minutes)
  return set(new Date(), { hours: hoursNum, minutes: minutesNum, seconds: 0 })
}
