'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { registerLocale, setDefaultLocale } from  'react-datepicker'
import { id } from 'date-fns/locale'

export function Providers({ children }) {
  registerLocale('id', id)
  setDefaultLocale('id')
  return (
    <CacheProvider>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}