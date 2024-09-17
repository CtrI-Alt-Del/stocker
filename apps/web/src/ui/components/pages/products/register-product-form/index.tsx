import { Button, Divider, Input } from '@nextui-org/react'

export const RegisterProductForm = () => {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between'>
        <Input label='Nome' isRequired />
        <label
          htmlFor='image'
          className='grid place-content-center rounded-md border-dashed bg-zinc-400'
        >
          <p className='text-zinc-500'>Carreque sua imagem aqui.</p>
          <input id='image' type='file' className='sr-only' />
        </label>
      </div>
      <div className='flex justify-between'>
        <Input label='Descrição' isRequired />
        <Input label='Código do produto' isRequired />
      </div>
      <div className='flex justify-between'>
        <Input label='Marca' isRequired />
        <Input label='Modelo' isRequired />
      </div>
      <div className='flex justify-between'>
        <Input label='Categoria' />
        <div className='flex items-center gap-3'>
          <Input label='Preço de custo' placeholder='R$' isRequired />
          <Input label='Preço de venda' placeholder='R$' isRequired />
        </div>
      </div>

      <Divider className='my-2' />

      <div className='flex justify-between'>
        <Input label='Peso' placeholder='kg' isRequired />
        <Input label='Largura' placeholder='cm' isRequired />
      </div>
      <div className='flex justify-between'>
        <Input label='Comprimento' placeholder='cm' isRequired />
        <Input label='Altura' placeholder='cm' isRequired />
      </div>

      <Divider className='my-2' />

      <div className='flex justify-between'>
        <Input label='Estoque mínimo' placeholder='cm' isRequired />
        <Input label='Setor' placeholder='cm' />
      </div>

      <div className='flex items-center gap-3'>
        <Button color='danger'>Cancelar</Button>
        <Button color='primary'>Confirmar</Button>
      </div>
    </div>
  )
}
