'use client'

import { Button, Divider, Input, Select, SelectItem } from '@nextui-org/react'
import type { SupplierDto } from '@stocker/core/dtos'
import { useUpdateSupplierForm } from './use-update-supplier-form'

type UpdateSupplierCategoryProps = {
  supplier: SupplierDto
  onCancel: VoidFunction
  onSubmit: VoidFunction
}

export const UpdateSupplierForm = ({
  onSubmit,
  onCancel,
  supplier,
}: UpdateSupplierCategoryProps) => {
  const { register, errors, handleSubmit, isDirty, isSubmiting } =
    useUpdateSupplierForm({
      onSubmit,
      onCancel,
      supplier,
    })

  return (
    <form onSubmit={handleSubmit} encType='multiform/form-data' className='space-y-6'>
      <div className='w-full'>
        <div className='grid grid-cols-1 w-full  grid-rows-3 gap-6'>
          <Input
            label='Fornecedor'
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
          className='text-orange'
        >
          <span className='text-white'>Atualizar</span>
        </Button>
      </div>
    </form>
  )
}
