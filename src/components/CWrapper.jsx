'use client'

import Headbar from '@/components/Headbar'
import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

export default function CWrapper({ sidebar, children }) {
  return (
    <Grid
      templateAreas={`"sidebar header"
                      "sidebar main"`}
      gridTemplateRows={'min-content 1fr'}
      gridTemplateColumns={'max-content 1fr'}
      h='100vh'
      maxHeight='100vh'
      overflow='hidden'
    >
      <GridItem area='header' as={Headbar} />
      <GridItem area='sidebar' py='1'>
        {/* <$Sidebar/> */}
        {sidebar}
      </GridItem>
      <GridItem area='main' overflow='auto' p='4'>
        {children}
      </GridItem>
    </Grid>
  )
}
