'use client'

import { Button, Divider, Tab, Tabs } from '@nextui-org/react'

import type { ProductDto } from '@stocker/core/dtos'
import type { Batch } from '@stocker/core/entities'

import { useBreakpoint } from '@/ui/hooks'
import { Drawer } from '../../commons/drawer'
import { useProductStockPage } from './use-product-stock'
import { RegisterInboundInventoryMovementForm } from './register-inbound-movement-form'
import { BatchesTable } from './batches-table'
import { Icon } from '../../commons/icon'

type ProductStockPageProps = {
  productDto: ProductDto
}

export const ProductStockPage = ({ productDto }: ProductStockPageProps) => {
  const { product, handleDrawerOpen, handleRegisterInboundInventoryMovementFormSubmit } =
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
            onOpen={handleDrawerOpen}
            trigger={
              <Button color='primary' radius='sm' endContent={<Icon name='inbound' />}>
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

          <Button color='primary' radius='sm' endContent={<Icon name='outbound' />}>
            Lançamento de saída
          </Button>
        </div>
      </div>

      <div>
        <Tabs
          aria-label='Abas'
          color='primary'
          variant='underlined'
          classNames={{
            tabList:
              'gap-12 mt-6 w-full relative rounded-none p-0 border-b-2 border-divider ',
            cursor: 'w-full bg-zinc-900',
            tab: 'max-w-fit px-0 h-12',
            tabContent: 'group-data-[selected=true]:text-zinc-800',
          }}
        >
          <Tab key='batches' title='Lotes' className='text-lgp'>
            <Divider />
            <BatchesTable batches={product.batches} />
          </Tab>
          <Tab key='inventory-movements' title='Lançamentos' className='text-lgp'>
            <Divider />
            Aba de Lançamentos
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
