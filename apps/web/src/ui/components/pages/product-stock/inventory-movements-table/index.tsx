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
import { Datetime } from '@stocker/core/libs'

type InventoryMovementsTableProps = {
  inventoryMovements: InventoryMovement[]
}

export const InventoryMovementsTable = ({
  inventoryMovements,
}: InventoryMovementsTableProps) => {

  return (
    <Table aria-label='Example table with dynamic content' className='mt-8'
    >
      <TableHeader>
         <TableColumn key='datetime' className='uppercase'>
            DATA E HORA
          </TableColumn>
         <TableColumn key='lançamento' className='uppercase'>
            TIPO DE LANÇAMENTO
          </TableColumn>
         <TableColumn key='qtditems' className='uppercase'>
            QUANTIDADE MOVIMENTADA
          </TableColumn>
         <TableColumn key='funcionario' className='uppercase'>
            FUNCIONÁRIO
          </TableColumn>
         <TableColumn key='observation' className='uppercase'>
            OBSERVAÇÃO
          </TableColumn>

      </TableHeader>
      <TableBody items={inventoryMovements} emptyContent='Nenhum lançamento registrado para esse produto'>
        {(item) => (
          <TableRow>
           <TableCell>{ new Datetime(item.registeredAt).format('DD/MM/YYYY HH:mm')}</TableCell>
           <TableCell> {item.movementType === 'inbound'?'Entrada':'Saída' } </TableCell>
           <TableCell> {item.itemsCount} </TableCell>
           <TableCell> {item.responsibleId} </TableCell>
           <TableCell> {item.remark ??'N\A'} </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
