import { headers } from 'next/headers'
import { Providers } from './providers'
import { APP_ROUTES as app } from '@/app/consts'

export async function generateMetadata() {
  const headerList = headers()
  const path = headerList.get('x-invoke-path') ?? ''
  const title = app[path] && `${app[path]} - TWMS` || 'TWMS - Total Workshop Management System'
  const description = 'Sistem Informasi Monitoring dan Alokasi Pekerjaan Bengkel'
  return { title, description }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
