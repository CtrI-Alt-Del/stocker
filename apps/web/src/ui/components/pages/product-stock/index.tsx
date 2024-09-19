'use client'

import { Button } from '@nextui-org/react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

export const ProductStockPage = () => {
  
  const rows = [
    {
      key: "1",
      datetime: "2023-09-19 08:00",
      lançamento: "ENTRADA",
      observation: "Reunião com a diretoria",
      fornecedor: "Fornecedor A",
    },
    {
      key: "2",
      datetime: "2023-09-19 09:00",
      lançamento: "SAÍDA",
      observation: "Trabalho em projeto X",
      fornecedor: "Fornecedor B",
    },
    {
      key: "3",
      datetime: "2023-09-19 10:00",
      lançamento: "SAÍDA",
      observation: "Implementação de funcionalidades",
      fornecedor: "Fornecedor C",
    },
    {
      key: "4",
      datetime: "2023-09-19 11:00",
      lançamento: "ENTRADA",
      observation: "Reunião com a comunidade",
      fornecedor: "Fornecedor D",
    },
  ];
  

const columns = [
  {
    key: "datetime",
    label: "DATA E HORA",
  },
  {
    key: "lançamento",
    label: "LANÇAMENTO",
  },
  {
    key: "observation",
    label: "OBSERVAÇÃO",
  },
  {
    key: "fornecedor",
    label: "FORNECEDOR",
  },
];

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex justify-end'>
          <h1 className='text-2xl'>Banana</h1>
          <small className='uppercase text-xl text-zinc-400'>K04-59</small>
        </div>

        <div className='space-x-2'>
          <Button color='primary'>Lançamento de entrada</Button>
          <Button color='primary'>Lançamento de saída</Button>
        </div>
      </div>
      <Table aria-label="Example table with dynamic content" className='mt-24'>
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
    </div>
  )
}
