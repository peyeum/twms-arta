'use client'

import { ButtonGroup, Icon, IconButton } from "@chakra-ui/react";
import { useContext } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function TableActionCell({data, context, ...rest}) {
  const {
    handleEditActions,
    handleDeleteActions,
  } = useContext(context)
  return (
    <ButtonGroup variant='ghost' spacing='1' {...rest}>
      <IconButton
        colorScheme='yellow'
        aria-label='Edit Data'
        icon={<Icon as={FiEdit}
        onClick={() => handleEditActions(data)}
        />}
      />
      <IconButton
        colorScheme='red'
        aria-label='Delete Data'
        icon={<Icon as={FiTrash2} />}
        onClick={() => handleDeleteActions(data)}
      />
    </ButtonGroup>
  )
}
