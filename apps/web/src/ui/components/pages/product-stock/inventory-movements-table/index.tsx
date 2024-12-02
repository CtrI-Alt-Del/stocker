'use client'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from '@nextui-org/react'

import type { InventoryMovement } from '@stocker/core/entities'
import { Datetime } from '@stocker/core/libs'

type InventoryMovementsTableProps = {
  page: number
  isLoading: boolean
  totalPages: number
  onPageChange: (page: number) => void
  inventoryMovements: InventoryMovement[]
}

export const InventoryMovementsTable = ({
  inventoryMovements,
  page,
  isLoading,
  totalPages,
  onPageChange,
}: InventoryMovementsTableProps) => {
  return (
    <Table
      aria-label='Example table with dynamic content'
      className='mt-8'
      shadow='none'
      bottomContentPlacement='outside'
      bottomContent={
        totalPages > 1 ? (
          <div className='flex w-full justify-start'>
            <Pagination
              aria-label='pagination'
              showControls
              page={page}
              total={totalPages}
              onChange={onPageChange}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        <TableColumn key='datetime' className='uppercase'>
          Data e hora
        </TableColumn>
        <TableColumn key='lançamento' className='uppercase'>
          Tipo de lançamento
        </TableColumn>
        <TableColumn key='qtditems' className='uppercase'>
          Quantidade movimentada
        </TableColumn>
        <TableColumn key='funcionario' className='uppercase'>
          Funcionário
        </TableColumn>
        <TableColumn key='observation' className='uppercase'>
          Observação
        </TableColumn>
      </TableHeader>
      <TableBody
        items={inventoryMovements}
        emptyContent='Nenhum lançamento registrado para esse produto'
        isLoading={isLoading}
        loadingContent={<Spinner color='primary' />}
      >
        {(item) => (
          <TableRow>
            <TableCell>
              {new Datetime(item.registeredAt).format('DD/MM/YYYY HH:mm')}
            </TableCell>
            <TableCell className='font-semibold'>
              {item.movementType === 'inbound' ? 'Entrada' : 'Saída'}
            </TableCell>
            <TableCell>{item.itemsCount}</TableCell>
            <TableCell>
              <span className='truncate'>{item.responsible?.name}</span>
            </TableCell>
            <TableCell>
              <span className='truncate'>{item.remark ?? 'N/A'}</span>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
