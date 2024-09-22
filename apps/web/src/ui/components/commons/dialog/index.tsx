'use client'

import { type ForwardedRef, forwardRef, type ReactNode, useImperativeHandle } from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { Slot } from '@radix-ui/react-slot'

import type { DialogRef } from './types'

type DialogProps = {
  title: string
  children: (closeDialog: VoidFunction) => ReactNode 
  trigger?: ReactNode
  isLarge?: boolean
}

const DialogComponent = (
  { title, children, trigger, isLarge }: DialogProps,
  ref: ForwardedRef<DialogRef>,
) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useImperativeHandle(
    ref,
    () => {
      return {
        close: onClose,
        open: onOpen,
      }
    },
    [onClose, onOpen],
  )

  return (
    <>
      <Modal size={isLarge ? '2xl' : 'md'} isOpen={isOpen} onClose={onClose}>
        <ModalContent className='z-[1000]'>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{children(onClose)}</ModalBody>
        </ModalContent>
      </Modal>
      {trigger && <Slot onClick={onOpen}>{trigger}</Slot>}
    </>
  )
}

export const Dialog = forwardRef(DialogComponent)
