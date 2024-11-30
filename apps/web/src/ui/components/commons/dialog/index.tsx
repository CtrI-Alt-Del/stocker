'use client'

import { type ForwardedRef, forwardRef, type ReactNode, useImperativeHandle } from 'react'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import { Slot } from '@radix-ui/react-slot'

import type { DialogRef } from './types'
import { useDialog } from './use-dialog'

type DialogProps = {
  title: string
  children: (closeDialog: VoidFunction) => ReactNode
  trigger?: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'
  isDismissable?: boolean
  hideCloseButton?: boolean
  onOpen?: () => void
}

const DialogComponent = (
  {
    title,
    children,
    trigger,
    size,
    isDismissable,
    hideCloseButton,
    onOpen: onOpenDialog,
  }: DialogProps,
  ref: ForwardedRef<DialogRef>,
) => {
  const { isOpen, open, close } = useDialog(onOpenDialog)

  useImperativeHandle(
    ref,
    () => {
      return {
        close,
        open,
      }
    },
    [open, close],
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
        onClose={close}
      >
        <ModalContent className='z-50 max-w-3/4'>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{children(close)}</ModalBody>
        </ModalContent>
      </Modal>
      {trigger && <Slot onClick={open}>{trigger}</Slot>}
    </>
  )
}

export const Dialog = forwardRef(DialogComponent)
