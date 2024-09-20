import { Button, DateInput, Divider, Input, Textarea } from '@nextui-org/react'
import { useRegisterInboundMovement } from './use-inbound-movement'

type RegisterProductFormProps = {
  onCancel: VoidFunction
}

export const RegisterInboundMovementForm = ({ onCancel }: RegisterProductFormProps) => {
  const { register, handleSubmit, errors } = useRegisterInboundMovement()

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='grid grid-cols-2 gap-6 flex-'>
        <DateInput
          label='Data e hora'
          granularity='second'
          isRequired
          {...register('creationDate')}
          errorMessage={errors.creationDate?.message}
        />
        <DateInput
          granularity='second'
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
          {...register('quantity')}
          errorMessage={errors.quantity?.message}
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
        <Button onClick={onCancel}>Cancelar</Button>
        <Button type='submit' color='primary'>
          Confirmar
        </Button>
      </div>
    </form>
  )
}
