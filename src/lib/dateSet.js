import { intlFormat, set } from "date-fns"

export default (date, options) => {
  const repDate = intlFormat(new Date(date), { timeZone: 'Asia/Jakarta' })
  return set(new Date(repDate), options)
}
