import React from 'react'
import LogoutComp from './LogoutComp'
import SidebarContent from './SidebarContent'
import Account from './Account'
import { Button, Flex, Icon, Tooltip } from '@chakra-ui/react'
import { IoMenuOutline } from 'react-icons/io5'

export default function SideBarWrapper({
  navsize,
  changeNavSize,
  handleMouseLeave,
  activeIndex,
  username,
  role,
  ...rest
}) {
  return(
    <Flex
      bg='blue.700'
      color='gray.50'
      h="full"
      w={navsize === 'small' ? '16' : '60'}
      direction='column'
      ml={navsize === 'small' ? '1' : '0'}
      rounded='2xl'
      boxShadow='2xl'
      align={navsize === 'small' ? 'center' : null}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <Tooltip
        label="Menu"
        placement="right"
        isDisabled={navsize === 'small' ? false : true}
      >
        <Button
          display="flex"
          align="center"
          justifyContent='start'
          p="2"
          mx={navsize === 'small' ? '2' : '4'}
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg='none'
          color='current'
          _hover={{
            bg: 'yellow.400',
            color: 'gray.700',
          }}
          mt='2'
          onClick={changeNavSize}
        >
          <Icon
            aria-label='Tombol Menu'
            mr={navsize === 'small' ? '0' : '4'}
            fontSize="3xl"
            as={IoMenuOutline}
          />
          {navsize === 'small' ? null : 'Menu'}
        </Button>
      </Tooltip>
      <Account navsize={navsize} username={username} role={role} />
      <SidebarContent navsize={navsize} activeIndex={activeIndex} />
      <LogoutComp navsize={navsize} />
    </Flex>
  )
}
