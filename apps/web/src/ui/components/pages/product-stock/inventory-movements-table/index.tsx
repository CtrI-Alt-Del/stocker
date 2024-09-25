'use client'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from '@nextui-org/react'

import type { InventoryMovement } from '@stocker/core/entities'

type InventoryMovementsTableProps = {
  inventoryMovements: InventoryMovement[]
}

export const InventoryMovementsTable = ({
  inventoryMovements,
}: InventoryMovementsTableProps) => {
  const columns = [
    {
      key: 'datetime',
      label: 'DATA E HORA',
    },
    {
      key: 'lançamento',
      label: 'TIPO DE LANÇAMENTO',
    },
    {
      key: 'observation',
      label: 'OBSERVAÇÃO',
    },
    {
      key: 'funcionario',
      label: 'FUNCIONÁRIO',
    },
  ]

  return (
    <Table aria-label='Example table with dynamic content' className='mt-8'>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={[]} emptyContent='Nenhum lançamento registrado para esse produto'>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
