'use client'

import { Drawer } from '@/ui/components/commons/drawer'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from '@nextui-org/react'

import type { Batch } from '@stocker/core/entities'
import { Datetime } from '@stocker/core/libs'
import { UpdateBatchForm } from './update-batch-form'
import { IconButton } from '@/ui/components/commons/icon-button'

type BatchesTableProps = {
  batches: Batch[]
  onUpdateBatch: (updatedBatch: Batch) => void
}

export const BatchesTable = ({ batches, onUpdateBatch }: BatchesTableProps) => {
  return (
    <Table aria-label='Example table with dynamic content' className='mt-8'>
      <TableHeader>
        <TableColumn key='code'>Código</TableColumn>
        <TableColumn key='itens-count'>Quantidade de itens</TableColumn>
        <TableColumn key='expiration-date'>Data de validade</TableColumn>
        <TableColumn key='maximum-days-to-expiration'>
          Máximos de dias até notificação de validade
        </TableColumn>
        <TableColumn key='view'> </TableColumn>
      </TableHeader>
      <TableBody items={batches}>
        {(batch) => (
          <TableRow key={batch.id}>
            <TableCell>{batch.code}</TableCell>
            <TableCell>{batch.itemsCount}</TableCell>
            <TableCell>
              {batch.expirationDate
                ? new Datetime(batch.expirationDate).format('DD/MM/YYYY')
                : 'N/A'}
            </TableCell>
            <TableCell>N/A</TableCell>
            <TableCell>
              <Drawer trigger={<IconButton name='view' className='text-zinc-400' />}>
                {(closeDrawer) => (
                  <UpdateBatchForm
                    batch={batch}
                    onSubmit={(updatedBatchDto) => {
                      onUpdateBatch(batch.update(updatedBatchDto))
                      closeDrawer()
                    }}
                    onCancel={closeDrawer}
                  />
                )}
              </Drawer>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
