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

import type { Product } from '@stocker/core/entities'

import { Tag } from '@/ui/components/commons/tag'
import { Drawer } from '@/ui/components/commons/drawer'
import { IconButton } from '@/ui/components/commons/icon-button'
import type { DrawerRef } from '@/ui/components/commons/drawer/types'

import { IMAGE_PLACEHOLDER } from '@/constants'

import { UpdateProductForm } from '../../pages/products/update-product-form'
import { useProductsTable } from './use-products-table'
import { useAuthContext } from '../../contexts/auth-context'

type ProductsTableProps = {
  page: number
  isLoading: boolean
  products: Product[]
  totalPages: number
  selectedProductsIds?: string[]
  selectionMode?: 'single' | 'multiple' | 'none'
  onUpdateProduct?: VoidFunction
  onProductsSelectionChange?: (productsIds: string[]) => void
  onPageChange?: (page: number) => void
}

export const ProductsTable = ({
  isLoading,
  page,
  products,
  totalPages,
  selectedProductsIds,
  selectionMode,
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
    handleSelectionChange,
  } = useProductsTable({
    products,
    drawerRef,
    onUpdateProduct,
    onProductsSelectionChange,
  })
  const { userRole } = useAuthContext()
  const hasValidRole = userRole?.hasPermission('products-control')
  return (
    <>
      <Table
        arial-label='Tabela de produtos'
        shadow='none'
        selectionMode={selectionMode ? selectionMode : 'multiple'}
        selectedKeys={selectedProductsIds}
        onSelectionChange={handleSelectionChange}
        bottomContentPlacement='outside'
        bottomContent={
          totalPages > 1 ? (
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
          <TableColumn key='minimumStock'>ESTOQUE MINIMO</TableColumn>
          <TableColumn key='price'>PREÇO</TableColumn>
          <TableColumn key='category'>CATEGORIA</TableColumn>
          <TableColumn key='supplier'>FORNECEDOR</TableColumn>
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
          {(product) => (
            <TableRow key={product.id}>
              <TableCell key='name' className='w-80'>
                <div className='flex items-center gap-2'>
                  <Avatar
                    src={product.image !== '' ? product.image : IMAGE_PLACEHOLDER}
                    alt={product.name}
                    size='md'
                    className='size-8'
                  />
                  <p className='font-bold truncate'>{product.name}</p>
                </div>
              </TableCell>
              <TableCell key='code' className='w-48'>
                <span className='truncate'>{product.code}</span>
              </TableCell>
              <TableCell key='minimumStock'>{product.minimumStock}</TableCell>
              <TableCell key='price'>{product.costPrice.brl}</TableCell>
              <TableCell key='category'>
                <span className='truncate'>{product.category?.name ?? 'N/A'}</span>
              </TableCell>
              <TableCell key='supplier'>
                <span className='truncate'>{product.supplier?.name ?? 'N/A'}</span>
              </TableCell>
              <TableCell key='status'>
                {product.isActive ? (
                  <Tag type='sucess'>Ativo</Tag>
                ) : (
                  <Tag type='danger'>Desativo</Tag>
                )}
              </TableCell>
              {hasValidRole ? (
                <TableCell key='option'>
                  <Tooltip content='Editar produto' showArrow>
                    <IconButton
                      name='view'
                      className='size-6 text-zinc-500'
                      onClick={() => handleEditProductButtonClick(product)}
                    />
                  </Tooltip>
                </TableCell>
              ) : (
                <TableCell key='option'>{null}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Drawer ref={drawerRef} trigger={null} onClose={handleDrawerClose}>
        {() =>
          productBeingEditting && (
            <UpdateProductForm
              product={productBeingEditting}
              onSubmit={handleUpdateProductFormSubmit}
              onCancel={handleCancelEditting}
            />
          )
        }
      </Drawer>
    </>
  )
}
