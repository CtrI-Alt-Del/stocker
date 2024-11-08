'use client'

import {
  type ForwardedRef,
  forwardRef,
  type ReactNode,
  useEffect,
  useImperativeHandle,
} from 'react'
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
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'
  isDismissable?: boolean
  hideCloseButton?:boolean
}

const DialogComponent = (
  { title, children, trigger, size, isDismissable,hideCloseButton }: DialogProps,
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
      <Modal
        size={size ? size : 'md'}
        isDismissable={isDismissable ?? true}
        hideCloseButton={hideCloseButton ?? false}
        isOpen={isOpen}
        scrollBehavior='inside'
        classNames={{ wrapper: 'overflow-x-hidden' }}
        onClose={onClose}
      >
        <ModalContent className='z-50 max-w-3/4'>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{children(onClose)}</ModalBody>
        </ModalContent>
      </Modal>
      {trigger && <Slot onClick={onOpen}>{trigger}</Slot>}
    </>
  )
}

export const Dialog = forwardRef(DialogComponent)
