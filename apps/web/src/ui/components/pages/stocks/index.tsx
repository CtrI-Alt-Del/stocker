// export const StocksPage = () => {
//   return <>
//     <h1>Ola</h1>
//     </>
// }

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

import type { Product } from '@stocker/core/entities'


type StocksPageProps = {
  page: number
  isLoading: boolean
  products: Product[]
  selectedProductsIds?: string[]
  totalPages: number
  onProductsSelectionChange: (productsIds: string[]) => void
  onPageChange: (page: number) => void
}
export const StocksPage = ({
  page,
  isLoading,
  products,
  selectedProductsIds,
  totalPages,
  onProductsSelectionChange,
  onPageChange,
}: StocksPageProps) => {
  return (
    <>
      <Table
        aria-label='Tabela de Inventário'
        shadow='none'selectionMode='multiple'
        selectedKeys={selectedProductsIds}
        onSelectionChange={(selection) =>
          onProductsSelectionChange(Array.from(selection) as string[])
        }
        topContentPlacement='outside'
        bottomContentPlacement='outside'
        bottomContent={
          totalPages > 1 ? (
            <div className='flex w-full justify-start'>
              <Pagination
                aria-label='paginação'
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
          <TableColumn key='batch' className='uppercase'>
            Quantidade de lotes
          </TableColumn>
          <TableColumn key='inbound' className='uppercase'>
            Lançamentos de entrada
          </TableColumn>
          <TableColumn key='outbound' className='uppercase'>
            Lançamentos de saída
          </TableColumn>
          <TableColumn key='stock' className='uppercase'>
            Estoque atual
          </TableColumn>
          <TableColumn key='min-stock' className='uppercase'>
            Estoque mínimo
          </TableColumn>
          <TableColumn key='status' className='uppercase'>
            Status
          </TableColumn>
        </TableHeader>
        <TableBody
          items={products}
          isLoading={isLoading}
          loadingContent={<Spinner color='primary' />}
          emptyContent='Nenhum lançamento de estoque registrado'
        >
          {(product) => (
            <TableRow key={product.id}>
              <TableCell key='product'>{product.name}</TableCell>
              <TableCell key='batch'>
                {product.batchesCount}
              </TableCell>
              <TableCell key='inbound' className='font-semibold'>
                {product.inboundInventoryMovementsCount}
              </TableCell>
              <TableCell key='outbound'>{product.outboundInventoryMovementsCount}</TableCell>
              <TableCell key='stock'>{product.stockLevel}</TableCell>
              <TableCell key='min-stock'>{product.minimumStock}</TableCell>
              <TableCell key='status'>{product.isActive}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
