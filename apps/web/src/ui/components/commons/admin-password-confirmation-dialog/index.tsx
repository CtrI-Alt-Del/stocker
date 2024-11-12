import { Controller } from 'react-hook-form'
import { type ForwardedRef, forwardRef, type ReactNode } from 'react'
import { Button } from '@nextui-org/react'

import { Dialog } from '../dialog'
import type { DialogRef } from '../dialog/types'
import { useAdminPasswordConfirmationDialog } from './use-admin-password-confirmation-dialog'
import { PasswordInput } from '../password-input'

type AdminPasswordConfirmationDialogProps = {
  onConfirm: (isAuthenticated: boolean) => void
}

const AdminPasswordConfirmationDialogComponent = (
  { onConfirm }: AdminPasswordConfirmationDialogProps,
  ref: ForwardedRef<DialogRef>,
) => {
  const { control, isSubmiting, errors, handleSubmit } =
    useAdminPasswordConfirmationDialog(onConfirm)

  return (
    <Dialog ref={ref} title='Confirme com a sua senha' trigger={null}>
      {(closeDialog) => (
        <form
          id='admin-password-confirmation'
          onSubmit={async (e) => {
            e.preventDefault()
            await handleSubmit()
            closeDialog()
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
              form='admin-password-confirmation'
              color='primary'
              type='submit'
              className='text-center w-full font-semibold text-orange'
              isLoading={isSubmiting}
            >
              <span className='text-white'>Confirmar</span>
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  )
}

export const AdminPasswordConfirmationDialog = forwardRef(
  AdminPasswordConfirmationDialogComponent,
)
