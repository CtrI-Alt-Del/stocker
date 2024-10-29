import { Button, Input } from '@nextui-org/react'
import { useRequestPasswordForm } from './use-request-password-reset-form'

export const RequestPasswordResetForm = () => {
  const { register, errors, handleSubmit, reset } = useRequestPasswordForm()
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='grid grid-rows-4 gap-8 md:gap-2 w-full h-full'
      >
        <div className='flex items-center flex-col justify-center'>
          <h1 className='font-bold md:text-4xl text-2xl text-default-700'>
            Redefina sua Senha
          </h1>
          <p className='  sm:text-md text-sm   text-default-400'>
            Digite o email para redefinir sua senha
          </p>
        </div>
        <Input
          label='E-mail'
          size='md'
          {...register('email')}
          isInvalid={Boolean(errors.email)}
          errorMessage={errors.email?.message}
        />
        <Button
          color='primary'
          size='md'
          className='h-14 font-bold text-sm md:text-lg'
          radius='lg'
          type='submit'
        >
          Requisitar definição de senha
        </Button>
      </form>
    </>
  )
}
