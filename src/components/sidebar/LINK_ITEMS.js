import { IoBuildOutline, IoCalendarOutline, IoReaderOutline, IoServerOutline, IoStatsChartOutline } from "react-icons/io5"

const LINK_ITEMS = [
  { name: 'Dasbor', icon: IoStatsChartOutline, route: '/' },
  { name: 'Master Data', icon: IoServerOutline, route: '/master' },
  { name: 'Service', icon: IoBuildOutline, route: '/service' },
  { name: 'Booking', icon: IoCalendarOutline, route: '/booking' },
  { name: 'Laporan Service', icon: IoReaderOutline, route: '/laporan' },
]

export default LINK_ITEMS
