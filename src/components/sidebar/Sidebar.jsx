'use client'

import React, { useState } from 'react'
import {
  Box,
  Portal,
} from '@chakra-ui/react'

import { usePathname } from 'next/navigation'
import LINK_ITEMS from './LINK_ITEMS'
import SideBarWrapper from './SideBarWrapper'

export default function Sidebar({ username, role }) {
  const [navsize, setNavsize] = useState('small')
  const pathname = usePathname()
  const activeIndex = LINK_ITEMS.findIndex((item, index) => {
    if (!(index === 0)) return pathname.includes(item.route.slice(1))
    if (pathname === '/') return true
    return false
  })
  const changeNavSize = () => {
    if (navsize === 'small') {
      setNavsize('wide')
    } else {
      setNavsize('small')
    }
  }
  const handleMouseLeave = () => {
    if (navsize === 'wide') {
      setNavsize('small')
    }
  }

  return (
    <>
      {navsize === 'wide' && <Box h="full" w='16' mr='1'></Box>}
      <SidebarConditionalWrapper navsize={navsize}>
        <SideBarWrapper
          navsize={navsize}
          changeNavSize={changeNavSize}
          handleMouseLeave={handleMouseLeave}
          activeIndex={activeIndex}
          username={username}
          role={role}
        />
      </SidebarConditionalWrapper>
    </>
  )
  
}

const SidebarConditionalWrapper = ({ navsize, children }) => 
  (navsize === 'small' ? children : <SidebarUsePortal children={children} />)

const SidebarUsePortal = ({ children }) => {
  return (
    <Portal>
      <Box h='full' p='1' pos='absolute' inset='0'>
        {children}
      </Box>
    </Portal>
  )
}

