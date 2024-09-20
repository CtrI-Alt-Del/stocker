'use client'

import {
  Avatar,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'

import { Tag } from '@/ui/components/commons/tag'
import { Icon } from '@/ui/components/commons/icon'
import { IMAGE_PLACEHOLDER } from '@/constants'
import type { ProductDto } from '@stocker/core/dtos'

type ProductsTableProps = {
  page: number
  isLoading: boolean
  products: ProductDto[]
  totalPages: number
  onPageChange: (page: number) => void
}

export const ProductsTable = ({
  isLoading,
  page,
  products,
  totalPages,
  onPageChange,
}: ProductsTableProps) => {
  return (
    <>
      <Table
        arial-label='Products table'
        shadow='none'
        topContentPlacement='outside'
        selectionMode='multiple'
        bottomContentPlacement='outside'
        bottomContent={
          totalPages ? (
            <div className='flex w-full justify-start '>
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
          <TableColumn key='name'>NOME</TableColumn>
          <TableColumn key='code'>CODIGO</TableColumn>
          <TableColumn key='price'>PREÇO</TableColumn>
          <TableColumn key='minimumStock'>ESTOQUE MINIMO</TableColumn>
          <TableColumn key='distributor'>FORNECEDOR</TableColumn>
          <TableColumn key='status'>ATIVO</TableColumn>
          <TableColumn key='option'>AÇÕES</TableColumn>
        </TableHeader>
        <TableBody
          items={products}
          isLoading={isLoading}
          loadingContent={<Spinner color='primary' />}
          emptyContent={'Nenhum produto criado.'}
        >
          {(item) => (
            <TableRow>
              <TableCell key='NAME'>
                <div className='flex items-center gap-2'>
                  <Avatar
                    src={item.image}
                    alt={item.name}
                    fallback={IMAGE_PLACEHOLDER}
                    className='w-8 h-8 rounded-full'
                  />
                  <p className='font-bold'>{item.name}</p>
                </div>
              </TableCell>
              <TableCell key='code'>{item.code}</TableCell>
              <TableCell key='price'>{item.costPrice}</TableCell>
              <TableCell key='minimumStock'>{item.minimumStock}</TableCell>
              <TableCell key='distributor'>GABRIEL</TableCell>
              <TableCell key='status'>
                {item.isActive ? (
                  <Tag type='sucess'>Ativo</Tag>
                ) : (
                  <Tag type='danger'>Desativo</Tag>
                )}
              </TableCell>
              <TableCell key='option'>
                <div className='flex flex-row items-center justify-center gap-2'>
                  <Tooltip content='Editar produto'>
                    <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                      <Icon name='edit' className='size-6' />
                    </span>
                  </Tooltip>
                  <Tooltip content='Ver produto'>
                    <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                      <Icon name='view' className='size-6' />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
