'use client'

import { Link } from "@chakra-ui/next-js";
import {
  Flex,
  Icon,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import {
  IoCarSport,
  IoPersonCircle,
  IoPeople,
  IoFlag,
} from "react-icons/io5";

const navItems = [
  { label: 'Mobil', href: 'mobil', icon: IoCarSport },
  { label: 'Customer', href: 'customers', icon: IoPersonCircle },
  { label: 'User', href: 'users', icon: IoPeople },
  { label: 'Stall', href: 'stalls', icon: IoFlag },
]
export default function MasterDataNav() {
  const pathname = usePathname()
  const activeIndex = navItems.findIndex((item) => pathname.includes(item.href))
  return (
    <Flex
      px='4'
      borderBottom='1px'
      borderColor='blue.700'
    >
      <Flex
        gap='2'
      >
        {navItems.map(({ href, icon, label }, index) => (
          <NavItem key={index} href={href} icon={icon} label={label} isActive={index === activeIndex ? true : null} />
        ))}
      </Flex>
    </Flex>
  )
}

const NavItem = ({ href, icon, label, isActive, ...rest }) => {
  return (
    <Link
      href={`/master/${href}`}
      py='2'
      px='4'
      textDecor='none'
      borderTopRadius='lg'
      display='flex'
      gap='1'
      alignItems='center'
      bg={isActive ? 'gray.100' : null}
      pointerEvents={isActive ? 'none' : null}
      _hover={{
        bg: 'blue.700',
        color: 'gray.100',
      }}
      {...rest}
    >
      <Icon as={icon} />
      {label}
    </Link>
  )
}
