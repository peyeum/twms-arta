import { Box } from '@chakra-ui/react'
import React from 'react'
import NavItem from './NavItem'
import LINK_ITEMS from './LINK_ITEMS'

export default function SidebarContent({ navsize, activeIndex, role, ...rest }) {
  return (
    <Box
      h="full"
      w="full"
      {...rest}>
      {LINK_ITEMS.map((link, index) => {
        const navItem = (
          <NavItem
            key={index}
            icon={link.icon}
            route={link.route}
            navsize={navsize}
            tooltipIsDisabled={navsize === 'small' ? false : true}
            isActive={index === activeIndex ? true : false}
          >
            {link.name}
          </NavItem>
        )
        if (role !== 'admin' && index === 1) return null
        return navItem
      })}
    </Box>
  )
}
