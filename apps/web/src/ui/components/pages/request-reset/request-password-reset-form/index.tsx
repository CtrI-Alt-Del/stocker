'use client'

import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'

import { useRequestPasswordForm } from './use-request-password-reset-form'

export const RequestPasswordResetForm = () => {
  const { fieldErrors, isSubmitting, registerField, handleSubmit } =
    useRequestPasswordForm()

  return (
    <form onSubmit={handleSubmit} className='w-full h-full'>
      <div className='flex items-center flex-col justify-center mb-12'>
        <h1 className='font-bold md:text-4xl text-2xl '>Redefina sua Senha</h1>
        <p className='sm:text-md text-sm text-default-400'>
          Digite o email para redefinir sua senha
        </p>
      </div>
      <Input
        label='E-mail'
        size='md'
        {...registerField('email')}
        isInvalid={Boolean(fieldErrors.email)}
        errorMessage={fieldErrors.email?.message}
      />
      <Button
        color='primary'
        size='md'
        radius='lg'
        type='submit'
        isLoading={isSubmitting}
        className='w-full font-semibold mt-6'
      >
        Requisitar definição de senha
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
