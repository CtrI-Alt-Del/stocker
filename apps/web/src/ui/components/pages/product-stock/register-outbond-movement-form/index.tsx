import { Button, Divider, Input, Textarea } from '@nextui-org/react'
import { Controller } from 'react-hook-form'

import { Datetime } from '@stocker/core/libs'

import { useRegisterOutbondMovementForm } from './use-register-outbond-movement-form'

type RegisterInboundMovementForm = {
  productId: string
  onSubmit: VoidFunction
  onCancel: VoidFunction
}
export const RegisterOutboundInventoryMovementForm = ({
  productId,
  onCancel,
  onSubmit,
}: RegisterInboundMovementForm) => {
  const { control, errors, isSubmiting, formRef, register, handleSubmit } =
    useRegisterOutbondMovementForm(productId, onSubmit)

  return (
    <form ref={formRef} onSubmit={handleSubmit} className='space-y-6'>
      <div className='grid grid-cols-2 gap-6'>
        <Input
          type='number'
          label='Quantidade de itens'
          isRequired
          isInvalid={Boolean(errors.itemsCount?.message)}
          errorMessage={errors.itemsCount?.message}
          {...register('itemsCount')}
        />
        <Controller
          name='registeredAt'
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              type='datetime-local'
              label='Data e hora do registro'
              value={new Datetime(value).format('YYYY-MM-DDTHH:mm')}
              onChange={onChange}
              isInvalid={Boolean(error?.message)}
              errorMessage={error?.message}
            />
          )}
        />
      </div>
      <Textarea
        label='Observação'
        isInvalid={Boolean(errors.remark?.message)}
        {...register('remark')}
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
