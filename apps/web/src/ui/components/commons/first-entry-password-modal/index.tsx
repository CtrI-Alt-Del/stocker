import { Button, Input } from '@nextui-org/react'
import { Dialog } from '../dialog'
import { useFirstPasswordEntryModal } from './use-first-entry-password-modal'
import { useRef, useEffect } from 'react'
import type { DialogRef } from '../dialog/types'

export const FirstEntryPasswordModal = () => {
  const { isSubmiting, errors, register, handleSubmit } = useFirstPasswordEntryModal()
  const dialogRef = useRef<DialogRef>(null)

  useEffect(() => {
    dialogRef.current?.open()
  }, [])

  return (
    <Dialog
      ref={dialogRef}
      title='Defina sua senha definitiva'
      isDismissable={false}
      hideCloseButton={true}
      trigger={null}
    >
      {(closeDialog) => (
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            await handleSubmit()
            closeDialog()
          }}
          className='grid grid-rows-2 gap-2'
        >
          <Input
            label='Digita sua senha'
            {...register('password')}
            isInvalid={Boolean(errors.password)}
            errorMessage={errors.password?.message}
          />
          <div className='w-full flex justify-center items-center'>
            <Button
              color='primary'
              type='submit'
              className='text-center w-full font-semibold'
              isLoading={isSubmiting}
            >
              Confirmar
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  )
}
