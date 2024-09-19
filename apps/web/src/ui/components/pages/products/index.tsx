'use client'

import { Button, Input, SelectItem, Select } from '@nextui-org/react'

import { ProductsTable } from './products-table'

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
