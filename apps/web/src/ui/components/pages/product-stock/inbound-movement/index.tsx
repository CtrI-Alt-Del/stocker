import {
  Button,
  DateInput,
  Divider,
  Input,
  Progress,
  Switch,
  Textarea,
} from '@nextui-org/react'

import { useRegisterProductForm } from './use-inbound-movement'

type RegisterProductFormProps = {
  onCancel: VoidFunction
}

export const RegisterInboundMovementForm = ({ onCancel }: RegisterProductFormProps) => {
  const { register, handleSubmit } = useRegisterProductForm()

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='grid grid-cols-2 gap-6 flex-'>
        <DateInput
          label='Data e hora'
          granularity='second'
          hideTimeZone
          isRequired
          {...register('creationDate')}
        />
        <DateInput
          granularity='second'
          label='Validade'
          isRequired
          {...register('expireDate')}
        />
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <Input label='Quantia' isRequired {...register('quantity')} />
        <Input label='Codigo do Lote' isRequired  {...register('batchCode')}/>
      </div>

      <Textarea label='Descrição' {...register('description')} />

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
