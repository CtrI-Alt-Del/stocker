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
import { useStocksPage } from './use-stocks-page'
import { Tag } from '../../commons/tag'

export const StocksPage = () => {
  const { 
    handlePageChange,
    page,
    fetchProducts,
    isFetching,
    products,
    totalPages } = useStocksPage()

  return (
    <>
      <Table
        aria-label='Tabela de Inventário'
        shadow='none'
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
                onChange={handlePageChange}
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
            Status do estoque
          </TableColumn>
        </TableHeader>
        <TableBody
          items={products}
          isLoading={isFetching}
          loadingContent={<Spinner color='primary' />}
          emptyContent='Nenhum lançamento de estoque registrado'
        >
          {(product) => (
            <TableRow key={product.id}>
              <TableCell key='product'>{product.name}</TableCell>
              <TableCell key='batch'>{product.batchesCount}</TableCell>
              <TableCell key='inbound' className='font-semibold'>
                {product.inboundInventoryMovementsCount}
              </TableCell>
              <TableCell key='outbound'>
                {product.outboundInventoryMovementsCount}
              </TableCell>
              <TableCell key='stock'>{product.currentStock}</TableCell>
              <TableCell key='min-stock'>{product.minimumStock}</TableCell>
              <TableCell key='status'>
                {product.currentStock > product.minimumStock ? (
                  <Tag type='sucess'>Ideal</Tag>
                ) : product.currentStock > 0 ? (
                  <Tag type='warning'>Baixo</Tag>
                ) : (
                  <Tag type='danger'>Esgotado</Tag>
                )}
              </TableCell>
              {/* <TableCell key='status'>
                  <Tag type='sucess'>Ideal</Tag>
                  <Tag type='warning'>Baixo</Tag>
                  <Tag type='danger'>Esgotado</Tag>
              </TableCell> */}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
