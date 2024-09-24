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

import type { Batch } from '@stocker/core/entities'

type BatchesTableProps = {
  batches: Batch[]
}

export const BatchesTable = ({ batches }: BatchesTableProps) => {

  const columns = [
    {
      key: 'validity',
      label: 'VALIDADE',
    },
    {
      key: 'batch',
      label: 'LOTE',
    },
    {
      key: 'disponibility',
      label: 'DISPONÍVEL',
    },
  ]

  return (
    <Table aria-label='Example table with dynamic content' className='mt-24'>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={batches}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
