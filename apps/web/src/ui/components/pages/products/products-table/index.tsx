'use client'

import { useRef } from 'react'
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

import type { ProductDto } from '@stocker/core/dtos'

import { Tag } from '@/ui/components/commons/tag'
import { Drawer } from '@/ui/components/commons/drawer'
import { IconButton } from '@/ui/components/commons/icon-button'
import type { DrawerRef } from '@/ui/components/commons/drawer/types'
import { IMAGE_PLACEHOLDER } from '@/constants'
import { useBreakpoint } from '@/ui/hooks'
import { UpdateProductForm } from '../update-product-form'
import { useProductsTable } from './use-products-table'

type ProductsTableProps = {
  page: number
  isLoading: boolean
  products: ProductDto[]
  totalPages: number
  onUpdateProduct: VoidFunction
  onProductsSelectionChange: (productsIds: string[]) => void
  onPageChange: (page: number) => void
}

export const ProductsTable = ({
  isLoading,
  page,
  products,
  totalPages,
  onProductsSelectionChange,
  onUpdateProduct,
  onPageChange,
}: ProductsTableProps) => {
  const drawerRef = useRef<DrawerRef>(null)
  const {
    productBeingEditting,
    handleEditProductButtonClick,
    handleUpdateProductFormSubmit,
    handleCancelEditting,
    handleDrawerClose,
  } = useProductsTable(drawerRef, onUpdateProduct)
  const { md } = useBreakpoint()

  return (
    <>
      <Table
        arial-label='Tabela de produtos'
        shadow='none'
        topContentPlacement='outside'
        selectionMode='multiple'
        onSelectionChange={(selection) =>
          onProductsSelectionChange(Array.from(selection) as string[])
        }
        bottomContentPlacement='outside'
        bottomContent={
          totalPages ? (
            <div className='flex w-full justify-start '>
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
          <TableColumn key='name'>NOME</TableColumn>
          <TableColumn key='code'>CODIGO</TableColumn>
          <TableColumn key='price'>PREÇO</TableColumn>
          <TableColumn key='minimumStock'>ESTOQUE MINIMO</TableColumn>
          <TableColumn key='distributor'>FORNECEDOR</TableColumn>
          <TableColumn key='status'>STATUS</TableColumn>
          <TableColumn key='option'>{null}</TableColumn>
        </TableHeader>
        <TableBody
          items={products}
          isLoading={isLoading}
          loadingContent={<Spinner color='primary' />}
          aria-label='conteúdo da tabela'
          emptyContent={'Nenhum produto criado.'}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell key='name'>
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
                <Tooltip aria-content='Editar produto'>
                  <IconButton
                    name='view'
                    tooltip='Editar produto'
                    className='size-6 text-zinc-500'
                    onClick={() => handleEditProductButtonClick(item)}
                  />
                </Tooltip>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Drawer
        ref={drawerRef}
        width={md ? 400 : 700}
        trigger={null}
        onClose={handleDrawerClose}
      >
        {() =>
          productBeingEditting && (
            <UpdateProductForm
              productDto={productBeingEditting}
              onSubmit={handleUpdateProductFormSubmit}
              onCancel={handleCancelEditting}
            />
          )
        }
      </Drawer>
    </>
  )
}
