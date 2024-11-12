'use client'

import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'

import { useRequestPasswordForm } from './use-request-password-reset-form'

export const RequestPasswordResetForm = () => {
  const { fieldErrors, isSubmitting, registerField, handleSubmit } =
    useRequestPasswordForm()

  return (
    <form onSubmit={handleSubmit} className='w-full h-full'>
      <div className='flex flex-col items-center justify-center mb-12'>
        <h1 className='text-2xl font-bold md:text-4xl '>Redefina sua Senha</h1>
        <p className='text-sm sm:text-md text-default-400'>
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
        className='w-full mt-6 font-semibold text-orange'
      >
        <p className='text-white'>Requisitar definição de senha</p>
      </Button>
      <p className='mt-3 text-sm'>
        Já se lembrou da sua senha?{' '}
        <Link href='/login' className='font-black'>
          Entrar
        </Link>
      </p>
    </form>
  )
}
