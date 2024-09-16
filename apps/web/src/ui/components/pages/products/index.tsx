'use client'
import { Button, Input } from '@nextui-org/react'
import { Search } from 'lucide-react'

export const ProductsPage = () => {
  return (
    <>
      <div className='  flex-1 flex justify-between '>
        <div className='flex-1 max-w-96 space-y-2'>
          <h1 className='text-4xl font-black'>Produtos</h1>
          <Input
            placeholder='Pesquise por nome'
            size='sm'
            color='default'
            radius='sm'
            classNames={{
              inputWrapper: ['bg-zinc-300', 'h-8'],
              placeholder: 'text-[#8E8E8E]',
            }}
            endContent={<Search className='text-[#8E8E8E]' />}
          />
        </div>
        <Button
          variant='solid'
          color = 'success'
          size='lg'
          radius='sm'
          className='bg-[#EF5C31] hover:bg-orange-500 text-white font-black text-xl h-14 mr-9'
        >
          Adicionar
        </Button>
      </div>
    </>
  )
}
