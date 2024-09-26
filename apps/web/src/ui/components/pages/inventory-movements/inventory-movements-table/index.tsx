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
import { InventoryMovementDto } from '@stocker/core/dtos'
import { useInventoryMovementPage } from '../use-inventory-moviment'
import { InventoryMovement } from '@stocker/core/entities'
import { Datetime } from '@stocker/core/libs'
import { Tag } from 'lucide-react'

type AllInventoryMovementsTableProps = {
  page: number
  isLoading: boolean
  movements: InventoryMovementDto[]
  totalPages: number
  onPageChange: (page: number) => void
}
export const AllInventoryMovementsTable = ({
  isLoading,
  page,
  movements,
  totalPages,
  onPageChange,
}: AllInventoryMovementsTableProps) => {
  return (
    <>
      <Table
        aria-label='Inventory Movements Table'
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
          <TableColumn key='product'>PRODUTO</TableColumn>
          <TableColumn key='date'>DATA E HORA</TableColumn>
          <TableColumn key='type'>TIPO DE LANÇAMENTO </TableColumn>
          <TableColumn key='quantity'>QUANTIDADE MOVIMENTADA </TableColumn>
          <TableColumn key='employee'>FUNCIONÁRIO </TableColumn>
          <TableColumn key='remark'>OBSERVAÇÁO </TableColumn>
        </TableHeader>
        <TableBody
          items={movements}
          isLoading={isLoading}
          loadingContent={<Spinner color='primary' />}
          aria-label='conteudo'
          emptyContent={'Nenhum lançamento criado'}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell key='product'>{item.productId}</TableCell>
              <TableCell key='date'>
                {new Datetime(item.registeredAt).format('DD/MM/YYYY HH:mm')}
              </TableCell>
              <TableCell key='type'>
                {item.movementType === 'inbound' ? 'Entrada' : 'Saida'}
              </TableCell>
              <TableCell key='quantity'>{item.itemsCount}</TableCell>
              <TableCell key='employee'>{item.responsibleId}</TableCell>
              <TableCell key='remark'>{item.remark}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
