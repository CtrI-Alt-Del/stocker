import { useState } from 'react'
import { useProductsTableHook } from './use-products-table-hook'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'

export const ProductsTable = () => {
  const [page, setPage] = useState<number>(1)
  const { products, loading } = useProductsTableHook(page)
  if (loading) {
    return <h1>Carregando tabela....</h1>
  }
  return (
    <>
      <Table>
        <TableHeader>
          <TableColumn key={'name'}>NOME</TableColumn>
          <TableColumn key={'description'}>DESCRIÇÃO</TableColumn>
          <TableColumn key={'code'}>CODIGO</TableColumn>
          <TableColumn key={'price'}>PREÇO</TableColumn>

          <TableColumn key={'minimumStock'}>ESTOQUE MINIMO</TableColumn>

          <TableColumn key={'status'}> ATIVO</TableColumn>
        </TableHeader>
        <TableBody items={products}>
          {(item) => (
            <TableRow>
              <TableCell key={'NAME'}>
                <div className='flex items-center gap-2'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-8 h-8 rounded-full'
                  />
                  <p className='font-bold'>{item.name}</p>
                </div>
              </TableCell>
              <TableCell key={'description'}>{item.description}</TableCell>
              <TableCell key={'code'}>{item.code}</TableCell>
              <TableCell key={'price'}>{item.costPrice}</TableCell>
              <TableCell key={'minimumStock'}>{item.minimumStock}</TableCell>
              <TableCell key={'status'}>status</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
