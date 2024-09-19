import { Button, Divider, Input, Textarea } from '@nextui-org/react'

type RegisterProductFormProps = {
  onCancel: VoidFunction
}

export const RegisterProductForm = ({ onCancel }: RegisterProductFormProps) => {
  return (
    <div className='space-y-6'>
      <label
        htmlFor='image'
        className='grid place-content-center cursor-pointer h-32 w-full rounded-md border border-dashed border-zinc-500 bg-zinc-50'
      >
        <p className='text-zinc-500'>Carreque sua imagem aqui.</p>
        <input id='image' type='file' className='sr-only' />
      </label>
      <div className='grid grid-cols-2 gap-6'>
        <Input label='Nome' isRequired />
        <Input label='Código do produto' isRequired />
      </div>
      <Textarea label='Descrição' isRequired />

      <div className='grid grid-cols-2 gap-6'>
        <Input label='Unidade' isRequired />
        <Input label='Modelo' isRequired />
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <Input label='Fornecedor' />
        <Input label='Modelo' isRequired />
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <Input label='Categoria' />
        <div className='flex gap-3'>
          <Input label='Preço de custo' placeholder='R$' isRequired />
          <Input label='Preço de venda' placeholder='R$' isRequired />
        </div>
      </div>

      <Divider className='my-2' />

      <div className='grid grid-cols-2 gap-6'>
        <Input label='Peso' placeholder='kg' isRequired />
        <Input label='Largura' placeholder='cm' isRequired />
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <Input label='Comprimento' placeholder='cm' isRequired />
        <Input label='Altura' placeholder='cm' isRequired />
      </div>

      <Divider className='my-2' />

      <div className='grid grid-cols-2 gap-6'>
        <Input label='Estoque mínimo' placeholder='cm' isRequired />
        <Input label='Setor' />
      </div>

      <div className='flex items-center gap-3'>
        <Button color='danger' onClick={onCancel}>
          Cancelar
        </Button>
        <Button color='primary'>Confirmar</Button>
      </div>
    </div>
  )
}
