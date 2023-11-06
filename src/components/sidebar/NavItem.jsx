import { Icon, Link, Tooltip } from '@chakra-ui/react'
import React from 'react'

export default function NavItem({
  icon,
  children,
  route,
  navsize,
  tooltipIsDisabled,
  isActive,
  ...rest
}) {
  return (
    <Tooltip
      label={children}
      placement="right"
      isDisabled={tooltipIsDisabled}
    >
      <Link
        display="flex"
        align={navsize === 'small' ? 'center' : null}
        justifyContent={navsize === 'small' ? 'center' : null}
        bg={isActive ? 'gray.100' : null}
        color={isActive ? 'blue.700' : null}
        pointerEvents={isActive ? 'none' : null}
        p="2"
        mx={navsize === 'small' ? '2' : '4'}
        my='2'
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'yellow.400',
          color: 'gray.700',
        }}
        href={route}
        fontWeight='bold'
        {...rest}>
          {icon && (
            <Icon
            mr={navsize === 'small' ? '0' : '4'}
            fontSize="2xl"
            as={icon}
            />
          )}
        { navsize === 'small' ? null : children}
      </Link>
    </Tooltip>
  )
}
