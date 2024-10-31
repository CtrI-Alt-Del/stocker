import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'
import { Controller } from 'react-hook-form'

import { useLoginForm } from './use-login-form'
import { PasswordInput } from '@/ui/components/commons/password-input'
import { ROUTES } from '@/constants'

export const LoginForm = () => {
  const { errors, formControl, isSubmitting, handleSubmit, registerField } =
    useLoginForm()

  return (
    <div className='flex items-center justify-center flex-col flex-1 gap-5 w-full '>
      <h1 className='text-3xl font-bold w-full text-center'>Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-80'>
        <Input
          label='Email'
          placeholder='Digite seu email'
          labelPlacement='outside'
          size='md'
          isInvalid={Boolean(errors.email)}
          errorMessage={errors.email?.message}
          {...registerField('email')}
        />

        <Controller
          name='password'
          control={formControl}
          render={({ field: { value, onChange } }) => (
            <PasswordInput
              name='password'
              control={formControl}
              label='Senha'
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

        <p className='text-xs pb-4 justify-items-end'>
          Esqueceu sua senha?{' '}
          <Link href='/request-reset' className='font-semibold'>
            Clique aqui!
          </Link>
        </p>
        <div className='w-full flex flex-col justify-center items-center gap-3'>
          <Button
            color='primary'
            type='submit'
            size='md'
            isLoading={isSubmitting}
            className='font-semibold w-full'
          >
            Entrar
          </Button>
          <p className='text-xs pb-4'>
            Não possui uma conta?{' '}
            <Link href={ROUTES.subscribe} className='font-semibold'>
              Cadastre-se agora!
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
