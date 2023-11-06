import dateSet from "@/lib/dateSet"

const getTimeFromISOStringDate = (ISOStringDate) => {
  const date = new Date(ISOStringDate)
  const hour = date.getHours()
  const minute = date.getMinutes()
  return `${hour}:${minute}`
}

const getMultipliers = ( start_time, end_time ) => {
  const startTime = start_time.map(s => parseInt(s))
  const endTime = end_time.map(e => parseInt(e))

  const hour = [8, 9, 10, 11, 12, 13, 14, 15, 16]
  const getMinuteMultipiler = (minute) => {
    const minutes = [0, 15, 30, 45]
    if (minute < minutes[1] ) return 0
    if (minute >= minutes[1] && minute < minutes[2] ) return 1
    if (minute >= minutes[2] && minute < minutes[3] ) return 2
    if (minute >= minutes[3] && minute < 60) return 3
    return minute
  }
  
  const startHourMultipiler = hour.findIndex(h => h === startTime[0])
  const startMinuteMultipiler = getMinuteMultipiler(startTime[1])
  const endHourMultipiler = hour.findIndex(h => h === endTime[0])
  const endMinuteMultipiler = getMinuteMultipiler(endTime[1]) + 1

  return {
    startMultipiler: [startHourMultipiler, startMinuteMultipiler],
    endMultipiler: [endHourMultipiler, endMinuteMultipiler],
  }
}

export const calcAlocation = ({ startTime, endTime, }) =>{  
  const start = (getTimeFromISOStringDate(startTime)).split(':').slice(0, 2)
  const end = (getTimeFromISOStringDate(endTime)).split(':').slice(0, 2)
  
  const [ startHours ] = start
  const [ endHours ] = end
  const MIN_START_HOUR = 8
  const MAX_END_HOUR = 16
  const MIN_START_TIME = ['8', '0']
  const MAX_END_TIME = ['16', '59']
  
  const hourBase = 11.11 // in percentage
  const minuteBase = 2.7775 // in percentage
  const layoutTolerance = 0.5 // in percentage
  const marginTolerance = 0.5 // in px
  const wideTolerance = 1.5 // in px
  
  const {
    startMultipiler,
    endMultipiler,
  } = getMultipliers(
    !(parseInt(startHours) < MIN_START_HOUR) ? start : MIN_START_TIME,
    !(parseInt(endHours) > MAX_END_HOUR) ? end : MAX_END_TIME,
  )

  // result in percentage
  const startPercentage = startMultipiler.map((start, i) => {
    if (i === 0) return start * hourBase
    return start * minuteBase
  }).reduce((a, b) => a + b, 0)

  const endPercentage = (endMultipiler.map((end, i) => {
    if (i === 0) return end * hourBase
    return end * minuteBase
  }).reduce((a, b) => a + b, 0)) - startPercentage

  const marginLength = `calc(${startPercentage}% + ${marginTolerance}px + ${layoutTolerance}%)`
  const widthLength = `calc(${endPercentage}% - ${wideTolerance}px - ${layoutTolerance * 2}%)`
  return {
    marginLength,
    widthLength,
  }
}

export const calcBookingAllocation = (appointment) => {
  const date = new Date(appointment)
  // const endAppointment = date.getTime() + 1000 * 60 * 60 /** 1 hour */
  const endAppointment = date.getTime() + 1000 * 60 * 45 /** 45 minutes */
  const startTime = appointment
  const endTime = new Date(endAppointment).toISOString()

  return calcAlocation({ startTime, endTime})
}

export const getTimeGuidePosition = () => {
  const currentTime = new Date()
  if (currentTime.getHours() < 8) return 0
  if (currentTime.getHours() > 16) return 100
  const workingHoursStart = new Date();
  workingHoursStart.setHours(8, 0, 0);
  const workingHoursEnd = new Date();
  workingHoursEnd.setHours(16, 59, 0);
  const timeDiff = currentTime - workingHoursStart;
  const totalTime = workingHoursEnd - workingHoursStart;
  const linePos = (timeDiff / totalTime) * 100;
  return linePos
}

export const formatTglWaktu = (dateStr, option) => {
  const date = new Date(dateStr)  
  return new Intl.DateTimeFormat('en-UK', option).format(date)
}

export const getOptionLabel = (value, options) => {
  const found = options?.find((item) => item.value === value)
  return found ? found.label : '...'
}

export const getOption = (value, options) => {
  const found = options?.find((item) => item.value === value)
  return found ? found : null
}

export const convertTimeToISOString = (time, base) => {
  const [hour, minute] = time.split(':')
  const hourInt = parseInt(hour)
  const minuteInt = parseInt(minute)
  const date = dateSet(base, {
    hours: hourInt,
    minutes: minuteInt,
    seconds: 0,
  })
  return date
}

export const isISODateString = (input) => {
  const isoDatePattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d{3})?)?Z?(\+\d{2}:\d{2})?$/
  return isoDatePattern.test(input)
}

export const isDate = (input) => (Object.prototype.toString.call(input) === "[object Date]") ? true : false

export const getSubTitleDate = (rentang, date) => {
  const headerDate = Intl
    .DateTimeFormat('id-ID',{ dateStyle: 'long', timeZone: 'Asia/Jakarta',})
    .format(date)
  
  const subTitle = rentang === 'bulanan'
    ? 'Bulan ' + headerDate.slice(2)
    : 'Tanggal ' + headerDate
  return subTitle
}

export const subFirstTwoWords = (str) => {
  const [ first, second, third ] = str.split(' ');
  if (first.toLowerCase() === 'honda') return `${second} ${third}`
  return `${first} ${second}`
}

export const wait = async (time) => new Promise((resolve) => setTimeout(resolve, time))

export const customPickBy = (object, predicate) => {
  const result = {};
  for (const key in object) {
      if (object.hasOwnProperty(key) && predicate(object[key], key)) {
          result[key] = object[key];
      }
  }
  return result;
}

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const formatNumberWithLeadingZeros = (number, width) => {
  const numStr = (number + 1).toString();
  const leadingZerosCount = width - numStr.length;

  if (leadingZerosCount > 0) {
      return '0'.repeat(leadingZerosCount) + numStr;
  } else {
      return numStr;
  }
}

export const frtStallId = (num) => !isNaN(num)
  ? formatNumberWithLeadingZeros(num, 3)
  : '000'

export const sortStalls = (data) => {
  return data.sort((a, b) => {
    const getTypeOrder = (id) => {
      if (id.includes('qs')) return 1
      if (id.includes('pm')) return 2
      if (id.includes('gr')) return 3
      return 4
    }

    const getStallIdNumber = (id) => {
      return parseInt(id.match(/\d+/)[0])
    };

    const [aType, bType] = [getTypeOrder(a.id_stall), getTypeOrder(b.id_stall)]
    const [aIdNumber, bIdNumber] = [getStallIdNumber(a.id_stall), getStallIdNumber(b.id_stall)]

    if (aType !== bType) {
      return aType - bType
    } else if (aType === bType) {
      return aIdNumber - bIdNumber
    }
  })
}

/**
 * Calculates the average of an array of numbers.
 * @param {number[]} array - The array of numbers to calculate the average of.
 * @returns {number} The average of the array of numbers. Returns 0 if the array is empty.
 */
export const calculateAverage = (array) => {
  if (array.length === 0) {
      return 0
  }
  const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  return Math.floor((sum / array.length), 0)
}

export const getMaxValue = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    return 0
  }
  return Math.max(...array)
}

export const getMinValue = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    return 0
  }
  return Math.min(...array)
}

export const findMostFrequentElement = (array) => {
  const counts = array.reduce((acc, value) => {
    if (value in acc || acc.hasOwnProperty(value)) {
      acc[value]++
    } else {
      acc[value] = 1
    }
    return acc
  }, {});

  let maxCount = 0
  let mostFrequentElement = null

  for (const [element, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      mostFrequentElement = element;
    }
  }
  return mostFrequentElement === null
    ? [ 'tidak ada data' ]
    : [ mostFrequentElement, maxCount + ' unit' ]
}


/**
 * Creates a summary object for a category.
 *
 * @param {string} category - The category name.
 * @param {Array<number>} scores - An array of scores for overall, qs, pm, and gr.
 * @returns {Object} The summary object with category name and scores.
 */
export const createCategorySummary = ( category, [ overall, qs, pm, gr ] ) => ({
  category, overall, qs, pm, gr
})

