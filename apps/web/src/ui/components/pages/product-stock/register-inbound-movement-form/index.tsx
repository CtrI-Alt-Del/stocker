import { Button, Divider, Input, Textarea } from '@nextui-org/react'
import { Controller } from 'react-hook-form'

import type { Batch } from '@stocker/core/entities'
import { Datetime } from '@stocker/core/libs'

import { useRegisterInboundMovementForm } from './use-register-inbound-movement-form'

type RegisterInboundMovementForm = {
  productId: string
  onSubmit: (newBatch: Batch) => Promise<void>
  onCancel: VoidFunction
}

export const RegisterInboundInventoryMovementForm = ({
  productId,
  onCancel,
  onSubmit,
}: RegisterInboundMovementForm) => {
  const { control, errors, isSubmiting, formRef, register, handleSubmit } =
    useRegisterInboundMovementForm(productId, onSubmit)

  return (
    <form ref={formRef} onSubmit={handleSubmit} className='space-y-6'>
      <div className='grid grid-cols-2 gap-6'>
        <Input
          type='number'
          label='Quantidade de itens'
          isRequired
          isInvalid={Boolean(errors.itemsCount?.message)}
          {...register('itemsCount')}
          errorMessage={errors.itemsCount?.message}
        />
        <Controller
          name='registeredAt'
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              type='datetime-local'
              label='Data e hora de registro'
              value={new Datetime(value).format('YYYY-MM-DDTHH:mm')}
              onChange={onChange}
              isInvalid={Boolean(error?.message)}
              errorMessage={error?.message}
            />
          )}
        />
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <Input
          label='Codigo do Lote'
          isRequired
          isInvalid={Boolean(errors.batchCode?.message)}
          {...register('batchCode')}
          errorMessage={errors.batchCode?.message}
        />
        <Controller
          name='batchExpirationDate'
          control={control}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <Input
              type='date'
              label='Validade do lote'
              isInvalid={Boolean(errors.batchExpirationDate?.message)}
              onChange={onChange}
              errorMessage={error?.message}
            />
          )}
        />
      </div>
      <div className='grid grid-cols-2 gap-6 '>
        <Input
          label='Prazo da validade'
          type='number'
          isInvalid={Boolean(errors.daysUntilExpire?.message)}
          errorMessage={errors.daysUntilExpire?.message}

          {...register('daysUntilExpire')}
        />
      </div>
      <Textarea
        label='Observação'
        isInvalid={Boolean(errors.remark?.message)}
        {...register('remark')}
        errorMessage={errors.remark?.message}
      />

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
