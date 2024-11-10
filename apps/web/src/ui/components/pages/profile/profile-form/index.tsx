'use client'

import { Input, Button, Spinner } from '@nextui-org/react'
import React from 'react'
import { useProfileForm } from './use-profile-form'
import { DeleteAccount } from '../delete-account-button'

export const ProfileForm = () => {
  const { isSubmiting, isDirty, company, errors, register, handleSubmit } =
    useProfileForm()

  if (!company) return <Spinner size='lg' />

  return (
    <form onSubmit={handleSubmit} className='space-y-6 w-full'>
      <div className='mt-6 space-y-4'>
        <Input
          label='Nome'
          isRequired
          isInvalid={Boolean(errors.name)}
          errorMessage={errors.name?.message}
          {...register('name')}
        />

        <Input
          label='Email'
          isRequired
          isInvalid={Boolean(errors.email)}
          errorMessage={errors.email?.message}
          {...register('email')}
        />

        <Input
          label='Nome da empresa'
          isRequired
          isInvalid={Boolean(errors.companyName)}
          errorMessage={errors.companyName?.message}
          {...register('companyName')}
        />

        <Input
          label='CNPJ'
          isRequired
          isInvalid={Boolean(errors.cnpj)}
          errorMessage={errors.cnpj?.message}
          {...register('cnpj')}
        />
      </div>

      <div className='flex mt-5 flex-wrap-reverse md:justify-between'>
        <Button
          type='submit'
          color='primary'
          isLoading={isSubmiting}
          isDisabled={!isDirty}
        >
          Confirmar
        </Button>
        <DeleteAccount />
      </div>
    </form>
  )
}
