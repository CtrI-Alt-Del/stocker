'use client'

import { useRef } from 'react'
import { Controller } from 'react-hook-form'
import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from '@nextui-org/react'
import { useUpdateEmployeeForm } from './use-update-employee-form'
import type { UserDto } from '@stocker/core/dtos'

type UpdateEmployeeCategoryProps = {
  employee: UserDto

  onCancel: VoidFunction
  onSubmit: VoidFunction
}

export const UpdateEmployeeForm = ({
  onSubmit,
  onCancel,
  employee,
}: UpdateEmployeeCategoryProps) => {
  const { register, errors, handleSubmit, isDirty, isSubmiting, control } =
    useUpdateEmployeeForm({
      onSubmit,
      onCancel,
      employee,
    })

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
          <Input
            label='Senha do funcionário'
            isRequired
            isInvalid={Boolean(errors.password)}
            errorMessage={errors.password?.message}
            {...register('password')}
          />
          <Input
            label='Confirme a senha'
            isRequired
            isInvalid={Boolean(errors.confirmPassword)}
            errorMessage={errors.confirmPassword?.message}
            {...register('confirmPassword')}
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
          isDisabled={!isDirty}
          isLoading={isSubmiting}
        >
          Confirmar
        </Button>
      </div>
    </form>
  )
}
