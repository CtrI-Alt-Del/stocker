'use client'

import { Input, Button } from '@nextui-org/react'
import React, { useState } from 'react'
import { AdminLogoutButton } from '../admin-logout-button'
import { DeleteAdminAccount } from '../delete-admin-account-button'
import { useProfileForm } from './use-profile-form'

export const ProfileForm = () => {
  const { errors, register, handleSubmit, isSubmiting, update } = useProfileForm()

  return (
    <form
      onSubmit={handleSubmit}
      encType='multiform/form-data'
      className='space-y-6 mb-1 w-full'
    >
      <div className=' p-6'>
        <div className='mt-6 space-y-4'>
          <div className='mb-1'>
            <Input
              label='Nome'
              isRequired
              isInvalid={Boolean(errors.name)}
              errorMessage={errors.name?.message}
              {...register('name')}
            />
          </div>

          <div className='mb-1'>
            <Input
              label='Nome da empresa'
              isRequired
              isInvalid={Boolean(errors.companyName)}
              errorMessage={errors.companyName?.message}
              {...register('companyName')}
            />
          </div>

          <div className='mb-1'>
            <Input
              label='CNPJ'
              isRequired
              isInvalid={Boolean(errors.cnpj)}
              errorMessage={errors.cnpj?.message}
              {...register('cnpj')}
            />
          </div>

          <div className='mb-1'>
            <Input
              label='Email'
              isRequired
              isInvalid={Boolean(errors.email)}
              errorMessage={errors.email?.message}
              {...register('email')}
            />
          </div>
        </div>

        <div className='flex mt-5 flex-wrap-reverse md:justify-between'>
          <div className='mt-3 md:mt-0'>
            <AdminLogoutButton />
            <DeleteAdminAccount />
          </div>
          <div>
            <Button type='submit' color='primary' isLoading={isSubmiting}>
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
