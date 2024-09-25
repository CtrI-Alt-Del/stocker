'use client'

import { Button, Divider, Input } from '@nextui-org/react'
import type { Batch } from '@stocker/core/entities'
import type { BatchDto } from '@stocker/core/dtos'
import { useUpdateBatchForm } from './use-update-batch-form'
import { Controller } from 'react-hook-form'
import { Datetime } from '@stocker/core/libs'

type RegisterProductFormProps = {
  batch: Batch
  onCancel: VoidFunction
  onSubmit: (updatedBatchDto: Partial<BatchDto>) => void
}

export const UpdateBatchForm = ({
  batch,
  onSubmit,
  onCancel,
}: RegisterProductFormProps) => {
  const { isSubmiting, errors, control, register, handleSubmit } = useUpdateBatchForm(
    batch,
    onSubmit,
  )

  return (
    <form onSubmit={handleSubmit} encType='multiform/form-data' className='space-y-6'>
      <div className='grid grid-cols-2 gap-6'>
        <Input
          label='Código'
          isRequired
          isInvalid={Boolean(errors.code)}
          errorMessage={errors.code?.message}
          {...register('code')}
        />
        <Input
          label='Quantidade de itens'
          isRequired
          isInvalid={Boolean(errors.itemsCount)}
          errorMessage={errors.itemsCount?.message}
          {...register('itemsCount')}
        />
      </div>
      <div className='grid grid-cols-2 gap-6'>
        <Controller
          name='expirationDate'
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              type='date'
              label='Validade do lote'
              defaultValue={value ? new Datetime(new Date()).format('YYYY-MM-DD') : ''}
              isInvalid={Boolean(errors.expirationDate?.message)}
              onChange={onChange}
              errorMessage={error?.message}
            />
          )}
        />
        <Input
          type='number'
          label='Máximo de dias para aviso de expiração'
          isInvalid={Boolean(errors.maximumDaysToExipiration)}
          errorMessage={errors.maximumDaysToExipiration?.message}
          {...register('maximumDaysToExipiration')}
        />
      </div>

      <Divider className='my-2' />

      <div className='flex items-center gap-3'>
        <Button onClick={onCancel} isDisabled={isSubmiting}>
          Cancelar
        </Button>
        <Button type='submit' color='primary' isLoading={isSubmiting}>
          Confirmar
        </Button>
      </div>
    </form>
  )
}
