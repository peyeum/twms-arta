import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function ModalForm({ isOpen, onClose, modalTitle, children, ...rest }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset='slideInBottom'
      {...rest}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </Modal>
  )
}
