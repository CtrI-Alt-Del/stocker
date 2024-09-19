import { Button, Divider, Input, Progress, Switch, Textarea } from '@nextui-org/react'

import { useRegisterProductForm } from './use-register-product-form'

type RegisterProductFormProps = {
  onCancel: VoidFunction
}

export const RegisterProductForm = ({ onCancel }: RegisterProductFormProps) => {
  const { register, handleSubmit } = useRegisterProductForm()

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <label
        htmlFor='image'
        className='grid place-content-center cursor-pointer h-32 w-full rounded-md border border-dashed border-zinc-500 bg-zinc-50'
      >
        <p className='text-zinc-500'>Carreque sua imagem aqui.</p>
        <input id='image' type='file' className='sr-only' />
      </label>
      <div className='grid grid-cols-2 gap-6'>
        <Input label='Nome' isRequired {...register('name')} />
        <Input label='Código do produto' isRequired {...register('code')} />
      </div>

      <Textarea label='Descrição' {...register('description')} />

      <div className='grid grid-cols-2 gap-6'>
        <Input label='Unidade' isRequired {...register('uom')} />
        <Input label='Modelo' isRequired {...register('model')} />
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <Input label='Fornecedor' />
        <Input label='Modelo' isRequired />
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <Input label='Categoria' />
        <div className='flex gap-3'>
          <Input
            label='Preço de custo'
            placeholder='R$'
            isRequired
            {...register('costPrice')}
          />
          <Input
            label='Preço de venda'
            placeholder='R$'
            isRequired
            {...register('sellingPrice')}
          />
        </div>
      </div>

      <Divider className='my-2' />

      <div className='grid grid-cols-2 gap-6'>
        <Input
          type='number'
          label='Peso'
          placeholder='kg'
          isRequired
          {...register('weight')}
        />
        <Input
          type='number'
          label='Largura'
          placeholder='cm'
          isRequired
          {...register('width')}
        />
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <Input label='Comprimento' placeholder='cm' isRequired {...register('length')} />
        <Input label='Altura' placeholder='cm' isRequired {...register('height')} />
      </div>

      <Divider className='my-2' />

      <div className='grid grid-cols-2 gap-6'>
        <Input
          label='Estoque mínimo'
          placeholder='cm'
          isRequired
          {...register('minimumStock')}
        />
        <Input label='Setor' />
      </div>

      <Switch defaultSelected>Ativo</Switch>

      <div className='flex items-center gap-3'>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button type='submit' color='primary'>
          Confirmar
        </Button>
      </div>
    </form>
  )
}
