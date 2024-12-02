'use client'

import { useRef } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'

import type { Batch } from '@stocker/core/entities'
import { Datetime } from '@stocker/core/libs'

import { Drawer } from '@/ui/components/commons/drawer'
import { IconButton } from '@/ui/components/commons/icon-button'
import type { DrawerRef } from '@/ui/components/commons/drawer/types'
import { UpdateBatchForm } from './update-batch-form'
import { useBatchesTable } from './use-batches-table'
import { useAuthContext } from '@/ui/components/contexts/auth-context'

type BatchesTableProps = {
  batches: Batch[]
  selectedBatchesIds: string[]
  onUpdateBatch: (updatedBatch: Batch) => void
  onBatchesSelectionChange: (productsIds: string[]) => void
}

export const BatchesTable = ({
  batches,
  selectedBatchesIds,
  onUpdateBatch,
  onBatchesSelectionChange,
}: BatchesTableProps) => {
  const drawerRef = useRef<DrawerRef>(null)
  const {
    batchBeingUpdating,
    handleBatchesSelectionChange,
    handleUpdateBatchButtonClick,
    handleDrawerClose,
  } = useBatchesTable({
    drawerRef,
    batches,
    onBatchesSelectionChange,
  })
  const { userRole } = useAuthContext()
  const hasValidRole = userRole?.hasPermission('products-control')

  return (
    <>
      <Table
        aria-label='Example table with dynamic content'
        selectionMode={hasValidRole ? 'multiple' : 'none'}
        selectedKeys={selectedBatchesIds}
        onSelectionChange={handleBatchesSelectionChange}
      >
        <TableHeader>
          <TableColumn key='code' className='uppercase'>
            Código
          </TableColumn>
          <TableColumn key='itens-count' className='uppercase'>
            Quantidade de itens
          </TableColumn>
          <TableColumn key='expiration-date' className='uppercase'>
            Data de validade
          </TableColumn>
          <TableColumn key='maximum-days-to-expiration' className='uppercase'>
            Dias até expiração
          </TableColumn>
          <TableColumn key='maximum-days-to-expiration' className='uppercase'>
            Máximos de dias até notificação de validade
          </TableColumn>
          <TableColumn key='view' className='uppercase'>
            {' '}
          </TableColumn>
        </TableHeader>
        <TableBody
          items={batches}
          emptyContent='Nenhum lote encontrado para esse produto.'
        >
          {(batch) => (
            <TableRow key={batch.id}>
              <TableCell>{batch.code}</TableCell>
              <TableCell>{batch.itemsCount}</TableCell>
              <TableCell>
                {batch.expirationDate
                  ? new Datetime(batch.expirationDate).format('DD/MM/YYYY')
                  : 'N/A'}
              </TableCell>
              <TableCell>{batch.daysToExpiration ?? 'N/A'}</TableCell>
              <TableCell>{batch.maximumDaysToExpiration ?? 'N/A'}</TableCell>
              <TableCell>
                {hasValidRole ? (
                  <IconButton
                    name='view'
                    onClick={() => handleUpdateBatchButtonClick(batch)}
                    className='text-zinc-400'
                  />
                ) : null}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Drawer ref={drawerRef} trigger={null} onClose={handleDrawerClose}>
        {(closeDrawer) => {
          if (batchBeingUpdating)
            return (
              <UpdateBatchForm
                batch={batchBeingUpdating}
                onSubmit={(updatedBatchDto) => {
                  onUpdateBatch(batchBeingUpdating.update(updatedBatchDto))
                  closeDrawer()
                }}
                onCancel={closeDrawer}
              />
            )
        }}
      </Drawer>
    </>
  )
}
