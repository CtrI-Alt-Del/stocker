'use client'

import { Button } from '@nextui-org/react'

import type { ProductDto } from '@stocker/core/dtos'
import { type Batch, Product } from '@stocker/core/entities'

import { useBreakpoint } from '@/ui/hooks'
import { Drawer } from '../../commons/drawer'
import { useProductStockPage } from './use-product-stock'
import { RegisterInboundInventoryMovementForm } from './register-inbound-movement-form'

type ProductStockPageProps = {
  productDto: ProductDto
}

export const ProductStockPage = ({ productDto }: ProductStockPageProps) => {
  const { product, handleRegisterInboundInventoryMovementFormSubmit } =
    useProductStockPage(productDto)
  const { md } = useBreakpoint()

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex justify-end flex-col'>
          <h1 className='text-2xl flex justify-end font-semibold'>{product.name}</h1>
          <small className='uppercase text-lg text-zinc-400'>{product.code}</small>
        </div>

        <div className='space-x-2'>
          <Drawer
            width={md ? 400 : 700}
            trigger={
              <Button variant='solid' color='primary' radius='sm'>
                Lançamento de entrada
              </Button>
            }
          >
            {(closeDrawer) => (
              <RegisterInboundInventoryMovementForm
                productId={product.id}
                onCancel={closeDrawer}
                onSubmit={async (newBatch: Batch) => {
                  await handleRegisterInboundInventoryMovementFormSubmit(newBatch)
                  closeDrawer()
                }}
              />
            )}
          </Drawer>

          <Button color='primary'>Lançamento de saída</Button>
        </div>
      </div>
    </div>
  )
}
