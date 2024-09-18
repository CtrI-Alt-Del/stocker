'use client'

import { Button, Input, SelectItem, Select } from '@nextui-org/react'
import { Search } from 'lucide-react'
import { ProductsTable } from './products-table'
import { NextApiClient } from '@/api/next/next-api-client'
import { Drawer } from '../../commons/drawer'
import { RegisterProductForm } from './register-product-form'
import { useBreakpoint } from '@/ui/hooks'

export const ProductsPage = () => {
  const { md } = useBreakpoint()

  return (
    <>
      <div className='flex justify-between'>
        <div className='flex-1 max-w-96 space-y-2'>
          <h1 className='text-3xl font-black'>Produtos</h1>
          <div className='flex flex-row gap-3 justify-center items-center'>
            <Input
              placeholder='Pesquise por nome'
              size='md'
              color='default'
              radius='sm'
              classNames={{
                inputWrapper: ['bg-zinc-100', 'h-12'],
                placeholder: 'text-zinc-300',
              }}
              className='w-[40rem]'
              endContent={<Search className='text-zinc-300' />}
            />
          </div>
        </div>

        <Drawer
          width={md ? 400 : 700}
          trigger={
            <Button variant='solid' color='primary' radius='sm'>
              Adicionar produto
            </Button>
          }
        >
          {(closeDrawer) => <RegisterProductForm onCancel={closeDrawer} />}
        </Drawer>
      </div>
      <ProductsTable />
    </>
  )
}
