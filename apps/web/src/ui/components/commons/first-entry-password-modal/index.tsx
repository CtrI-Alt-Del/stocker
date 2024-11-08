import { Button, Input } from '@nextui-org/react'
import { Dialog } from '../dialog'
import { useFirstPasswordEntryModal } from './use-first-entry-password-modal'

export const FirstEntryPasswordModal = () => {
  const { register, errors, handleSubmit } = useFirstPasswordEntryModal()
  return (
    <Dialog title='Defina sua senha' trigger={null}>
      {() => (
        <form onSubmit={handleSubmit} className='grid grid-rows-2 gap-2'>
          <Input
            label='Defina sua senha'
            {...register('password')}
            isInvalid={Boolean(errors.password)}
            errorMessage={errors.password?.message}
          />
          <div className='w-full flex justify-center items-center'>
            <Button color='primary' type='submit' className='text-center w-full font-bold'>
              Confirmar
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  )
}
