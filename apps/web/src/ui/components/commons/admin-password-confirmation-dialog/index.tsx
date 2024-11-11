import { Controller } from 'react-hook-form'
import type { ReactNode } from 'react'
import { Button } from '@nextui-org/react'

import { Dialog } from '../dialog'
import { useAdminPasswordConfirmationDialog } from './use-admin-password-confirmation-dialog'
import { PasswordInput } from '../password-input'

type AdminPasswordConfirmationDialogProps = {
  children: ReactNode
  onConfirm: (isAuthenticated: boolean) => void
}

export const AdminPasswordConfirmationDialog = ({
  children,
  onConfirm,
}: AdminPasswordConfirmationDialogProps) => {
  const { control, isSubmiting, errors, handleSubmit } =
    useAdminPasswordConfirmationDialog(onConfirm)

  return (
    <Dialog
      title='Confirme com a sua senha'
      isDismissable={false}
      hideCloseButton={true}
      trigger={children}
    >
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
                placeholder='Digite sua senha'
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
