'use client'

import { Button, Tab, Tabs } from '@nextui-org/react'
import { twMerge } from 'tailwind-merge'

import type { ProductDto } from '@stocker/core/dtos'
import type { Batch } from '@stocker/core/entities'

import { Drawer } from '../../commons/drawer'
import { RegisterInboundInventoryMovementForm } from './register-inbound-movement-form'
import { RegisterOutboundInventoryMovementForm } from './register-outbond-movement-form'
import { BatchesTable } from './batches-table'
import { InventoryMovementsTable } from './inventory-movements-table'
import { Icon } from '../../commons/icon'
import { AlertDialog } from '../../commons/alert-dialog'
import { useProductStockPage } from './use-product-stock-page'
import { useAuthContext } from '../../contexts/auth-context'

type ProductStockPageProps = {
  productDto: ProductDto
}

export const ProductStockPage = ({ productDto }: ProductStockPageProps) => {
  const {
    isFetching,
    page,
    totalPages,
    product,
    inventoryMovements,
    isDeletingBatches,
    selectedBatchesIds,
    handleBatchUpdate,
    handlePageChange,
    handleBatchesIdsSelectionChange,
    handleDeleteBatchesButtonClick,
    handleRegisterInboundInventoryMovementFormSubmit,
    handleRegisterOutboundInventoryMovementFormSubmit,
  } = useProductStockPage(productDto)
  const { userRole } = useAuthContext()

  return (
    <div>
      <div className='flex flex-col gap-3 lg:gap-0 lg:flex-row lg:items-center justify-between'>
        <div className='flex justify-end flex-col'>
          <h1 className='text-2xl font-semibold'>{product.name}</h1>

          <small
            aria-label='Código do produto'
            className='uppercase text-base text-zinc-400'
          >
            {product.code}
          </small>
          <div className='mt-2 flex items-center gap-2'>
            <p className='text-zinc-400 text-sm'>Estoque atual: {product.currentStock}</p>
            <span className='size-1 rounded-full bg-zinc-400' />
            <p className='text-zinc-400 text-sm'>
              Estoque mínimo: {product.minimumStock}
            </p>
          </div>
        </div>

        {userRole?.hasPermission('inventory-movements') && (
          <div className='flex flex-col sm:flex-row gap-1'>
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
                  productId={product.id}
                  onCancel={closeDrawer}
                  onSubmit={(itemsCount) => {
                    closeDrawer()
                    handleRegisterOutboundInventoryMovementFormSubmit(itemsCount)
                  }}
                />
              )}
            </Drawer>
          </div>
        )}
      </div>

      <Tabs
        aria-label='Abas'
        color='primary'
        variant='underlined'
        fullWidth
        classNames={{
          tabList:
            'gap-12 mt-6 w-full relative rounded-none p-0 border-b-2 border-divider ',
          cursor: 'w-full bg-zinc-900',
          tab: 'max-w-fit px-0',
          tabContent: 'group-data-[selected=true]:text-zinc-800',
        }}
      >
        <Tab key='batches' title='Lotes' className='text-lg'>
          <AlertDialog
            onConfirm={handleDeleteBatchesButtonClick}
            trigger={
              <Button
                color='danger'
                isLoading={isDeletingBatches}
                className={twMerge(
                  'mt-1',
                  selectedBatchesIds.length > 0
                    ? 'visible'
                    : 'invisible pointer-events-auto',
                )}
              >
                Deletar lote(s)
              </Button>
            }
          >
            {selectedBatchesIds.length > 1
              ? 'Tem certeza que deseja deletar esses lotes?'
              : 'Tem certeza que deseja deletar esse lote?'}
          </AlertDialog>

          <div className='mt-2'>
            <BatchesTable
              batches={product.batches}
              selectedBatchesIds={selectedBatchesIds}
              onUpdateBatch={handleBatchUpdate}
              onBatchesSelectionChange={handleBatchesIdsSelectionChange}
            />
          </div>
        </Tab>
        <Tab key='inventory-movements' title='Lançamentos' className='text-lg'>
          <InventoryMovementsTable
            isLoading={isFetching}
            totalPages={totalPages}
            page={page}
            onPageChange={handlePageChange}
            inventoryMovements={inventoryMovements}
          />
        </Tab>
      </Tabs>
    </div>
  )
}
