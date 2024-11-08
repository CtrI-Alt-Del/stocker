'use client'

import { Button } from '@nextui-org/react'
import { Controller } from 'react-hook-form'
import Link from 'next/link'

import { useResetPasswordForm } from './use-reset-password-form'
import { PasswordInput } from '@/ui/components/commons/password-input'
import { ROUTES } from '@/constants'

type ResetPasswordPageProps = {
  email: string
}

export const ResetPasswordForm = ({ email }: ResetPasswordPageProps) => {
  const { isSuccess, isSubmitting, fieldErrors, formControl, handleSubmit } =
    useResetPasswordForm(email)

  return isSuccess ? (
    <div className='grid place-content-center gap-6 w-full h-full'>
      <strong className='font-bold md:text-2xl text-xl flex justify-center items-center whitespace-nowrap'>
        Senha redefinida com sucesso!
      </strong>
      <Button
        as={Link}
        href={ROUTES.login}
        color='primary'
        size='lg'
        className='font-semibold'
        radius='lg'
      >
        Voltar para fazer login
      </Button>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className='w-full h-full'>
      <div className=''>
        <h1 className='font-bold md:text-4xl text-xl'>Redefinindo sua senha</h1>
        <p className='sm:text-md text-md text-default-400'>
          Digite sua nova senha e confirme para prosseguir
        </p>
      </div>

      <Controller
        name='password'
        control={formControl}
        render={({ field: { value, onChange } }) => (
          <div className='mt-12'>
            <PasswordInput
              name='password'
              label='Senha'
              placeholder='Digite sua senha'
              labelPlacement='outside'
              size='md'
              isInvalid={Boolean(fieldErrors.password)}
              errorMessage={fieldErrors.password?.message}
              value={value}
              onChange={onChange}
            />
          </div>
        )}
      />

      <Controller
        name='confirmPassword'
        control={formControl}
        render={({ field: { value, onChange } }) => (
          <div className='mt-12'>
            <PasswordInput
              name='confirmPassword'
              label='Confirme sua senha'
              placeholder='Confirme sua senha'
              labelPlacement='outside'
              size='md'
              isInvalid={Boolean(fieldErrors.confirmPassword?.message)}
              errorMessage={fieldErrors.confirmPassword?.message}
              value={value}
              onChange={onChange}
            />
          </div>
        )}
      />

      <Button
        color='primary'
        className='font-bold w-full mt-6'
        type='submit'
        isLoading={isSubmitting}
      >
        Redefinir senha
      </Button>
      <p className='text-sm mt-3'>
        Já possui uma conta?{' '}
        <Link href='/login' className='font-black'>
          Entrar
        </Link>
      </p>
    </form>
  )
}
