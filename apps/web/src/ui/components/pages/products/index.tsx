'use client'

import { Button } from '@nextui-org/react'

import { ProductsTable } from './products-table'

import { Drawer } from '../../commons/drawer'
import { RegisterProductForm } from './register-product-form'
import { useProductsPage } from './use-products-page'
import { Search } from '../../commons/search'
import { AlertDialog } from '../../commons/alert-dialog'

export const ProductsPage = () => {
  const {
    isFetching,
    isDeleting,
    page,
    products,
    totalPages,
    filterByNameValue,
    selectedProductsIds,
    handlePageChange,
    handleSearchChange,
    handleUpdateProduct,
    handleDeleteProductsAlertDialogConfirm,
    handleProductsSelectionChange,
    handleRegisterProductFormSubmit,
  } = useProductsPage()

  return (
    <>
      <div className='flex justify-between'>
        <div className='flex-1 max-w-96 space-y-2'>
          <h1 className='text-3xl font-black'>Produtos</h1>
          <Search value={filterByNameValue} onSearchChange={handleSearchChange} />
        </div>

        <div className='flex items-center gap-1'>
          {selectedProductsIds.length > 0 && (
            <AlertDialog
              trigger={
                <Button color='danger' isLoading={isDeleting}>
                  Deletar produtos
                </Button>
              }
              onConfirm={handleDeleteProductsAlertDialogConfirm}
            >
              {selectedProductsIds.length > 1
                ? 'Você tem certeza que deseja deletar esses produtos?'
                : 'Você tem certeza que deseja deletar esse produto?'}
            </AlertDialog>
          )}
          <Drawer
            trigger={
              <Button variant='solid' color='primary' radius='sm'>
                Adicionar produto
              </Button>
            }
          >
            {(closeDrawer) => (
              <RegisterProductForm
                onSubmit={async () => {
                  await handleRegisterProductFormSubmit()
                  closeDrawer()
                }}
                onCancel={closeDrawer}
              />
            )}
          </Drawer>
        </div>
      </div>
      <div className='mt-3'>
        <ProductsTable
          products={products}
          totalPages={totalPages}
          isLoading={isFetching}
          selectedProductsIds={selectedProductsIds}
          page={page}
          onProductsSelectionChange={handleProductsSelectionChange}
          onUpdateProduct={handleUpdateProduct}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}
