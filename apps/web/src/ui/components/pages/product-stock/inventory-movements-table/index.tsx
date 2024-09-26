'use client'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'

import type { InventoryMovement } from '@stocker/core/entities'
import { Datetime } from '@stocker/core/libs'

type InventoryMovementsTableProps = {
  inventoryMovements: InventoryMovement[]
}

export const InventoryMovementsTable = ({
  inventoryMovements,
}: InventoryMovementsTableProps) => {
  return (
    <Table aria-label='Example table with dynamic content' className='mt-8'>
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
      >
        {(item) => (
          <TableRow>
            <TableCell>
              {new Datetime(item.registeredAt).format('DD/MM/YYYY HH:mm')}
            </TableCell>
            <TableCell>{item.movementType === 'inbound' ? 'Entrada' : 'Saída'}</TableCell>
            <TableCell>{item.itemsCount}</TableCell>
            <TableCell>{item.responsible.name}</TableCell>
            <TableCell>{item.remark ?? 'N/A'}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
