'use client'

import { type ForwardedRef, forwardRef, type ReactNode } from 'react'

import { Dialog } from '../dialog'
import type { DialogRef } from '../dialog/types'
import { Button, ModalFooter } from '@nextui-org/react'

type AlertDialogProps = {
  children: string
  trigger: ReactNode
  onConfirm: VoidFunction
}

const AlertDialogComponent = (
  { children, trigger, onConfirm }: AlertDialogProps,
  ref: ForwardedRef<DialogRef>,
) => {
  return (
    <Dialog ref={ref} title='Mensagem de alerta' trigger={trigger} isDismissable={false}>
      {(closeDialog) => (
        <>
          <p className='text-lg text-zinc-600'>{children}</p>
          <ModalFooter className='p-0 justify-start mt-3 pb-3'>
            <Button onClick={closeDialog}>Cancelar</Button>
            <Button
              color='primary'
              onClick={() => {
                onConfirm()
                closeDialog()
              }}
            >
              Confirmar
            </Button>
          </ModalFooter>
        </>
      )}
    </Dialog>
  )
}

export const AlertDialog = forwardRef(AlertDialogComponent)
