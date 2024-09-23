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
  const rows = [
    {
      key: '1',
      datetime: '2023-09-19 08:00',
      lançamento: 'ENTRADA',
      observation: 'Reunião com a diretoria',
      fornecedor: 'Fornecedor A',
    },
    {
      key: '2',
      datetime: '2023-09-19 09:00',
      lançamento: 'SAÍDA',
      observation: 'Trabalho em projeto X',
      fornecedor: 'Fornecedor B',
    },
    {
      key: '3',
      datetime: '2023-09-19 10:00',
      lançamento: 'SAÍDA',
      observation: 'Implementação de funcionalidades',
      fornecedor: 'Fornecedor C',
    },
    {
      key: '4',
      datetime: '2023-09-19 11:00',
      lançamento: 'ENTRADA',
      observation: 'Reunião com a comunidade',
      fornecedor: 'Fornecedor D',
    },
  ]

  const columns = [
    {
      key: 'datetime',
      label: 'DATA E HORA',
    },
    {
      key: 'lançamento',
      label: 'LANÇAMENTO',
    },
    {
      key: 'observation',
      label: 'OBSERVAÇÃO',
    },
    {
      key: 'fornecedor',
      label: 'FORNECEDOR',
    },
  ]

  return (
    <Table aria-label='Example table with dynamic content' className='mt-24'>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
