export const CAR_MODEL_LIST = ['brio', 'br-v', 'city', 'civic', 'cr-v', 'hr-v', 'jazz', 'mobilio', 'odyssey', 'accord', 'freed', 'stream', 'civic-type-r', 'cr-z', 'cr-x', 'legend', 'nsx', 'prelude', 's2000']

export const HARIAN_TABLE_HEADER = [
  { field: 'category', displayName: 'Kategori' },
  { field: 'overall', displayName: 'Keseluruhan' },
  { field: 'qs', displayName: 'Quick Service' },
  { field: 'pm', displayName: 'Periodical Maintenance' },
  { field: 'gr', displayName: 'General Repair' },
]

export const SERVICE_STATUS_OPTIONS = [
  {
    value: 'onprogress',
    label: 'On Progress',
  },
  {
    value: 'finished',
    label: 'Selesai',
  },
  {
    value: 'wash',
    label: 'Cuci',
  },
  {
    value: 'spooring',
    label: 'Spooring',
  },
  {
    value: 'enginedressing',
    label: 'Engine Dressing',
  },
  {
    value: 'homeservice',
    label: 'Home Service',
  },
  {
    value: 'waiting',
    label: 'Antrean Service',
  },
]

export const SERVICE_STATUS_COLORS = {
  'onprogress': 'green.500, green.400',
  'finished': 'gray.800, gray.900',
  'wash': 'purple.600, purple.500',
  'spooring': 'yellow.500, yellow.400',
  'enginedressing': 'cyan.500, cyan.400',
  'homeservice': 'blue.500, blue.400',
  'waiting': 'red.600, red.500',
}

export const BOOKING_STATUS_OPTIONS = [
  {
    value: 'arrived',
    label: 'Sudah Datang',
  },
  {
    value: 'waiting',
    label: 'Belum Datang',
  },
]

export const APP_ROUTES = {
  '/': 'Dasbor',
  '/master': 'Master Data',
  '/service': 'Service',
  '/booking': 'Booking',
  '/laporan': 'Laporan Service',
}
