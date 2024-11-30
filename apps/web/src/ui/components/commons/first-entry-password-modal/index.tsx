import { Button, Input } from '@nextui-org/react'
import { Dialog } from '../dialog'
import { useFirstPasswordEntryModal } from './use-first-entry-password-modal'
import { useRef, useEffect } from 'react'
import type { DialogRef } from '../dialog/types'
import { PasswordInput } from '../password-input'
import { Controller } from 'react-hook-form'

export const FirstEntryPasswordModal = () => {
  const dialogRef = useRef<DialogRef>(null)
  const { isSubmiting, errors, control, handleSubmit } =
    useFirstPasswordEntryModal(dialogRef)

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
          onSubmit={async (event) => {
            closeDialog()
            await handleSubmit(event)
          }}
          className='grid grid-rows-2 gap-2 pb-3'
        >
          <Controller
            name='password'
            control={control}
            render={({ field: { value, onChange } }) => (
              <PasswordInput
                name='password'
                label='Digita sua senha'
                placeholder='******'
                labelPlacement='outside'
                size='md'
                isInvalid={Boolean(errors.password)}
                errorMessage={errors.password?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
          <div className='w-full flex justify-center items-center'>
            <Button
              color='primary'
              type='submit'
              className='text-center w-full font-semibold text-orange'
              isLoading={isSubmiting}
            >
              <p className='text-zinc-50'>Confirmar</p>
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  )
}
