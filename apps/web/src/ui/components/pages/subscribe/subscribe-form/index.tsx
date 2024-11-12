'use client'

import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'

import { PasswordInput } from '@/ui/components/commons/password-input'
import { useSubscribeForm } from './use-subscribe-form'
import { Controller } from 'react-hook-form'

export const SubscribeForm = () => {
  const { errors, control, isSubmitting, registerField, handleSubmit } =
    useSubscribeForm()

  return (
    <div className='w-full'>
      <h1 className='w-full text-xl font-bold text-center lg:text-3xl'>
        Cadastre sua conta
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-3 w-96'>
        <Input
          label='Nome'
          placeholder='Digite seu nome'
          labelPlacement='outside'
          size='md'
          {...registerField('name')}
          isInvalid={Boolean(errors.name)}
          errorMessage={errors.name?.message}
        />
        <Input
          label='Email'
          placeholder='Digite seu email'
          labelPlacement='outside'
          size='md'
          {...registerField('email')}
          isInvalid={Boolean(errors.email)}
          errorMessage={errors.email?.message}
        />

        <Input
          label='Razão Social'
          placeholder='Digite o nome da sua empresa'
          labelPlacement='outside'
          size='md'
          {...registerField('companyName')}
          isInvalid={Boolean(errors.companyName)}
          errorMessage={errors.companyName?.message}
        />
        <Input
          label='CNPJ'
          placeholder='Digite o CNPJ da sua empresa'
          labelPlacement='outside'
          size='md'
          {...registerField('cnpj')}
          isInvalid={Boolean(errors.cnpj)}
          errorMessage={errors.cnpj?.message}
        />

        <Controller
          name='password'
          control={control}
          render={({ field: { value, onChange } }) => (
            <PasswordInput
              name='password'
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

        <Controller
          name='confirmPassword'
          control={control}
          render={({ field: { value, onChange } }) => (
            <PasswordInput
              name='confirmPassword'
              label='Confirme sua senha'
              placeholder='Confirme sua senha'
              labelPlacement='outside'
              size='md'
              isInvalid={Boolean(errors.confirmPassword?.message)}
              errorMessage={errors.confirmPassword?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <div className='flex flex-col items-center justify-center w-full gap-3'>
          <Button
            color='primary'
            type='submit'
            size='md'
            isLoading={isSubmitting}
            className='w-full text-orange'
          >
            <span className='text-white'>Cadastrar-se</span>
          </Button>
          <p className='text-sm'>
            Já possui uma conta?{' '}
            <Link href='/login' className='font-black'>
              Entrar
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
