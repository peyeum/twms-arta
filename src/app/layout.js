import { headers } from 'next/headers'
import { Providers } from './providers'
// import Wrapper from './Wrapper'

export async function generateMetadata() {
  const headerList = headers()
  const path = headerList.get('x-invoke-path') ?? ''
  const app = {
    '/': 'Dasbor',
    '/master': 'Master Data',
    '/service': 'Service',
    '/booking': 'Booking',
    '/laporan': 'Laporan Service',
  }
  const title = app[path] && `${app[path]} - TWMS` || 'TWMS - Total Workshop Management System'
  const description = 'Sistem Informasi Monitoring dan Alokasi Pekerjaan Bengkel'
  return { title, description }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* <Wrapper children={children}/> */}
          {children}
        </Providers>
      </body>
    </html>
  )
}
