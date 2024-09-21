import { Button, DateInput, Divider, Input, Textarea } from '@nextui-org/react'
import { useRegisterInboundMovement } from './use-inbound-movement'
import { Controller } from 'react-hook-form'

type RegisterInboundMovementForm = {
  onSubmit: VoidFunction
  onCancel: VoidFunction
}

export const RegisterInboundMovementForm = ({ onCancel,onSubmit }: RegisterInboundMovementForm) => {
  const { control, errors, handleSubmit, isSubmiting, register } = useRegisterInboundMovement(onSubmit)

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='grid grid-cols-2 gap-6 flex-'>
        <Controller
          name='registeredAt'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DateInput
              label='Data e hora'
              granularity='second'
              isRequired
              onChange={onChange}
              errorMessage={error?.message}
            />

          )}
        />
        <Input
          type='date'
          label='Validade'
          isRequired
          {...register('expireDate')}
          errorMessage={errors.expireDate?.message}
        />
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <Input
          label='Quantia'
          isRequired
          {...register('itemsQuantity')}
          errorMessage={errors.itemsQuantity?.message}
        />
        <Input
          label='Codigo do Lote'
          isRequired
          {...register('batchCode')}
          errorMessage={errors.batchCode?.message}
        />
      </div>

      <Textarea
        label='Descrição'
        {...register('description')}
        errorMessage={errors.description?.message}
      />

      <Divider className='my-2' />

      <div className='flex items-center gap-3'>
        <Button onClick={onCancel} isDisabled={isSubmiting}>Cancelar</Button>
        <Button type='submit' color='primary' isLoading={isSubmiting}>
          Confirmar
        </Button>
      </div>
    </form>
  )
}
