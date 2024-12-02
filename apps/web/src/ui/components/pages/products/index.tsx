'use client'

import { Button } from '@nextui-org/react'

import { ProductsTable } from '../../commons/products-table'

import { Drawer } from '../../commons/drawer'
import { RegisterProductForm } from './register-product-form'
import { useProductsPage } from './use-products-page'
import { Search } from '../../commons/search'
import { AlertDialog } from '../../commons/alert-dialog'
import { useAuthContext } from '../../contexts/auth-context'
import { CategorySelect } from '../../commons/category-select'
import { LocationSelect } from '../../commons/location-select'
import { SupplierSelect } from '../../commons/supplier-select'

export const ProductsPage = () => {
  const {
    isFetching,
    isDeleting,
    page,
    products,
    totalPages,
    categoryId,
    locationId,
    supplierId,
    productName,
    selectedProductsIds,
    handleCategoryIdSearchChange,
    handleLocationIdchange,
    handleSupplierIdSearchChange,
    handlePageChange,
    handleSearchChange,
    handleUpdateProduct,
    handleDeleteProductsAlertDialogConfirm,
    handleProductsSelectionChange,
    handleRegisterProductFormSubmit,
  } = useProductsPage()

  const { userRole } = useAuthContext()
  const hasValidRole = userRole?.hasPermission('products-control')
  return (
    <>
      <div className='flex flex-col gap-3 md:flex-row md:gap-0 md:items-center md:justify-between'>
        <div className='flex-1 w-full space-y-3'>
          <h1 className='text-3xl font-black'>Produtos</h1>
          <div className='flex flex-col-reverse sm:flex-row justify-between gap-4 w-full'>
            <Search value={productName} onSearchChange={handleSearchChange} />
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
              {hasValidRole && (
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
              )}
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 max-w-3xl gap-3'>
            <CategorySelect
              onSelectChange={handleCategoryIdSearchChange}
              mode='filter'
              defeaultCategoryId={categoryId}
              className='w-full md:w-64'
            />
            <LocationSelect
              onSelectChange={handleLocationIdchange}
              mode='filter'
              defeaultLocationId={locationId}
              className='w-full md:w-64'
            />
            <SupplierSelect
              onSelectChange={handleSupplierIdSearchChange}
              defaultSupplierId={supplierId}
              mode='filter'
              className='w-full md:w-64'
            />
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <ProductsTable
          selectionMode={hasValidRole ? 'multiple' : 'none'}
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
