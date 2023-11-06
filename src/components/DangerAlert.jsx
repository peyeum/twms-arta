'use client'

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useBoolean } from '@chakra-ui/react'
import React from 'react'

export default function DangerAlert({ isOpen, onClose, title, message, callback}) {
  const cancelRef = React.useRef()
  const [flag, setFlag] = useBoolean(false)
  const handleClick = async () => {
    setFlag.on()
    await callback()
    onClose()
    setFlag.off()
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={handleClick} ml={3} isDisabled={flag}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

