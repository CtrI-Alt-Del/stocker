'use client'

import { Button, Divider, Tab, Tabs } from '@nextui-org/react'

import type { ProductDto } from '@stocker/core/dtos'
import type { Batch } from '@stocker/core/entities'

import { Drawer } from '../../commons/drawer'
import { useProductStockPage } from './use-product-stock'
import { RegisterInboundInventoryMovementForm } from './register-inbound-movement-form'
import { BatchesTable } from './batches-table'
import { Icon } from '../../commons/icon'
import { RegisterOutboundInventoryMovementForm } from './register-outbond-movement-form'
import { InventoryMovementsTable } from './inventory-moves-table'

type ProductStockPageProps = {
  productDto: ProductDto
}

export const ProductStockPage = ({ productDto }: ProductStockPageProps) => {
  const {
    product,
    inventoryMovements,
    handleBatchUpdate,
    handleRegisterInboundInventoryMovementFormSubmit,
  } = useProductStockPage(productDto)

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex justify-end flex-col'>
          <h1 className='text-2xl flex justify-end font-semibold'>{product.name}</h1>
          <small className='uppercase text-base text-zinc-400'>{product.code}</small>
          <div className='mt-3 flex items-center gap-2'>
            <p className='text-zinc-400 text-sm'>Estoque atual: {product.currentStock}</p>
            <span className='size-1 rounded-full bg-zinc-400' />
            <p className='text-zinc-400 text-sm'>
              Estoque mínimo: {product.minimumStock}
            </p>
          </div>
        </div>

        <div className='flex flex-row gap-3'>
          <Drawer
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

          <Drawer
            trigger={
              <Button color='primary' radius='sm' endContent={<Icon name='outbound' />}>
                Lançamento de saída
              </Button>
            }
          >
            {(closeDrawer) => (
              <RegisterOutboundInventoryMovementForm
                productID={product.id}
                onCancel={closeDrawer}
                onSubmit={async (newBatch: Batch) => {
                  await handleRegisterInboundInventoryMovementFormSubmit(newBatch)
                  closeDrawer()
                }}
              />
            )}
          </Drawer>
        </div>
      </div>

      <Tabs
        aria-label='Abas'
        color='primary'
        variant='underlined'
        classNames={{
          tabList:
            'gap-12 mt-6 w-full relative rounded-none p-0 border-b-2 border-divider ',
          cursor: 'w-full bg-zinc-900',
          tab: 'max-w-fit px-0',
          tabContent: 'group-data-[selected=true]:text-zinc-800',
        }}
      >
        <Tab key='batches' title='Lotes' className='text-lg'>
          <Divider />
          <BatchesTable batches={product.batches} onUpdateBatch={handleBatchUpdate} />
        </Tab>
        <Tab key='inventory-movements' title='Lançamentos' className='text-lg'>
          <Divider />
          <InventoryMovementsTable inventoryMovements={inventoryMovements} />
        </Tab>
      </Tabs>
    </div>
  )
}
