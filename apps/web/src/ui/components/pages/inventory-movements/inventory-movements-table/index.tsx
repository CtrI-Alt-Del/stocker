'use client'
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'

import type { InventoryMovementDto } from '@stocker/core/dtos'
import { Datetime } from '@stocker/core/libs'

type InventoryMovementsTableProps = {
  page: number
  isLoading: boolean
  movements: InventoryMovementDto[]
  totalPages: number
  onPageChange: (page: number) => void
}
export const InventoryMovementsTable = ({
  isLoading,
  page,
  movements,
  totalPages,
  onPageChange,
}: InventoryMovementsTableProps) => {
  return (
    <>
      <Table
        aria-label='Tabela de lançamentos de estoque'
        shadow='none'
        topContentPlacement='outside'
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
          <TableColumn key='product' className='uppercase'>
            Produto
          </TableColumn>
          <TableColumn key='date' className='uppercase'>
            Data e hora
          </TableColumn>
          <TableColumn key='type' className='uppercase'>
            Tipo de lançamento
          </TableColumn>
          <TableColumn key='quantity' className='uppercase'>
            Quantidade movimentada
          </TableColumn>
          <TableColumn key='employee' className='uppercase'>
            Funcionário
          </TableColumn>
          <TableColumn key='remark' className='uppercase'>
            Observação
          </TableColumn>
        </TableHeader>
        <TableBody
          items={movements}
          isLoading={isLoading}
          loadingContent={<Spinner color='primary' />}
          emptyContent='Nenhum lançamento de estoque registrado'
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell key='product'>{item.product.name}</TableCell>
              <TableCell key='date'>
                {new Datetime(item.registeredAt).format('DD/MM/YYYY HH:mm')}
              </TableCell>
              <TableCell key='movement-type' className='font-semibold'>
                {item.movementType === 'inbound' ? 'Entrada' : 'Saída'}
              </TableCell>
              <TableCell key='quantity'>{item.itemsCount}</TableCell>
              <TableCell key='employee'>{item.responsible.name}</TableCell>
              <TableCell key='remark'>{item.remark}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}