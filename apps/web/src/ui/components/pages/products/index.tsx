'use client'

import { Button } from '@nextui-org/react'

import { ProductsTable } from './products-table'

import { Drawer } from '../../commons/drawer'
import { RegisterProductForm } from './register-product-form'
import { useBreakpoint } from '@/ui/hooks'
import { useProductsPage } from './use-products-page'
import { Search } from '../../commons/search'
import { AlertDialog } from '../../commons/alert-dialog'

export const ProductsPage = () => {
  const {
    isFetching,
    page,
    products,
    totalPages,
    filterByNameValue,
    isDeleteProductsButtonVisible,
    handlePageChange,
    handleSearchChange,
    handleUpdateProduct,
    handleDeleteProductsAlertDialogConfirm,
    handleProductsSelectionChange,
    handleRegisterProductFormSubmit,
  } = useProductsPage()
  const { md } = useBreakpoint()

  return (
    <>
      <div className='flex justify-between'>
        <div className='flex-1 max-w-96 space-y-2'>
          <h1 className='text-3xl font-black'>Produtos</h1>
          <Search value={filterByNameValue} onSearchChange={handleSearchChange} />
        </div>

        <div className='flex items-center gap-1'>
          {isDeleteProductsButtonVisible && (
            <AlertDialog
              trigger={<Button color='danger'>Deletar produtos</Button>}
              onConfirm={handleDeleteProductsAlertDialogConfirm}
            >
              Você tem certeza que deseja deletar esse(s) produto(s)?
            </AlertDialog>
          )}
          <Drawer
            width={md ? 400 : 700}
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
      <ProductsTable
        products={products}
        totalPages={totalPages}
        isLoading={isFetching}
        page={page}
        onProductsSelectionChange={handleProductsSelectionChange}
        onUpdateProduct={handleUpdateProduct}
        onPageChange={handlePageChange}
      />
    </>
  )
}
