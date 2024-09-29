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
    <>
      <h3 className='text-xl text-zinc-800 font-semibold'>Lançamento de entrada</h3>
      <form ref={formRef} onSubmit={handleSubmit} className='space-y-6 mt-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
                isRequired
                isInvalid={Boolean(error?.message)}
                errorMessage={error?.message}
              />
            )}
          />
        </div>
        <Input
          label='Codigo do Lote'
          isRequired
          isInvalid={Boolean(errors.code?.message)}
          {...register('code')}
          className='w-full'
          errorMessage={errors.code?.message}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Controller
            name='expirationDate'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Input
                type='date'
                label='Validade do lote'
                isInvalid={Boolean(errors.expirationDate?.message)}
                onChange={onChange}
                errorMessage={error?.message}
              />
            )}
          />
          <Input
            label='Máximo de dias até validade'
            type='number'
            isInvalid={Boolean(errors.maximumDaysToExipiration?.message)}
            errorMessage={errors.maximumDaysToExipiration?.message}
            {...register('maximumDaysToExipiration')}
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
    </>
  )
}
