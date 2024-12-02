'use client'

import { Controller } from 'react-hook-form'
import { Button, Divider, Input, Select, SelectItem } from '@nextui-org/react'
import { useRegisterSupplierForm } from './use-register-supplier-form'

type RegisterProductFormProps = {
  onCancel: VoidFunction
  onSubmit: VoidFunction
}

export const RegisterSupplierForm = ({
  onSubmit,
  onCancel,
}: RegisterProductFormProps) => {
  const { register, errors, isSubmiting, handleSubmit } =
    useRegisterSupplierForm(onSubmit)

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='w-full'>
        <div className='grid grid-cols-1 w-full  grid-rows-3 gap-6'>
          <Input
            label='Nome'
            isRequired
            isInvalid={Boolean(errors.name)}
            errorMessage={errors.name?.message}
            {...register('name')}
          />
          <Input
            label='E-mail'
            isRequired
            isInvalid={Boolean(errors.email)}
            errorMessage={errors.email?.message}
            {...register('email')}
          />
          <Input
            label='CNPJ'
            isInvalid={Boolean(errors.cnpj)}
            errorMessage={errors.cnpj?.message}
            {...register('cnpj')}
          />
          <Input
            label='Telefone'
            isInvalid={Boolean(errors.phone)}
            errorMessage={errors.phone?.message}
            {...register('phone')}
          />
        </div>
      </div>

      <Divider className='my-2' />

      <div className='flex items-center gap-3'>
        <Button onClick={onCancel} isDisabled={isSubmiting}>
          Cancelar
        </Button>
        <Button type='submit' color='primary' isLoading={isSubmiting}>
          Confirm
        </Button>
      </div>
    </form>
  )
}
