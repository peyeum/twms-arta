import $Sidebar from '@/components/sidebar/$Sidebar'
import CWrapper from '@/components/CWrapper'

export default function Wrapper({ children }) {
  return (
    <CWrapper sidebar={<$Sidebar />} >
      {children}
    </CWrapper>
  )
}
