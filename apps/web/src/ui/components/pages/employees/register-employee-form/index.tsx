'use client'

import { Controller } from 'react-hook-form'
import { Button, Divider, Input, Select, SelectItem } from '@nextui-org/react'
import { useRegisterEmployeeForm } from './use-register-employee-form'

type RegisterProductFormProps = {
  onCancel: VoidFunction
  onSubmit: VoidFunction
}

export const RegisterEmployeeForm = ({
  onSubmit,
  onCancel,
}: RegisterProductFormProps) => {
  const { control, register, errors, handleSubmit, reset, isSubmiting } =
    useRegisterEmployeeForm(onSubmit)

  return (
    <form onSubmit={handleSubmit} encType='multiform/form-data' className='space-y-6'>
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
          <Controller
            name='role'
            control={control}
            render={({ field }) => (
              <Select
                label='Cargo'
                selectedKeys={new Set([field.value])}
                onSelectionChange={(selected) => field.onChange(Array.from(selected)[0])}
                isInvalid={Boolean(errors.role)}
                errorMessage={errors.role?.message}
              >
                <SelectItem key='manager'>Gerente</SelectItem>
                <SelectItem key='employee'>Funcionário</SelectItem>
              </Select>
            )}
          />
        </div>
      </div>

      <Divider className='my-2' />

      <div className='flex items-center gap-3'>
        <Button onClick={onCancel} isDisabled={isSubmiting}>
          Cancelar
        </Button>
        <Button
          type='submit'
          color='primary'
          isLoading={isSubmiting}
          className='text-orange'
        >
          <span className='text-white'>Confirmar</span>
        </Button>
      </div>
    </form>
  )
}
