'use client'

import { Button } from '@nextui-org/react'

import { ProductsTable } from './products-table'

import { Drawer } from '../../commons/drawer'
import { RegisterProductForm } from './register-product-form'
import { useBreakpoint } from '@/ui/hooks'
import { useProductsPage } from './use-products-page'
import { Search } from '../../commons/search'

export const ProductsPage = () => {
  const {
    isFetching,
    page,
    products,
    totalPages,
    filterByNameValue,
    handlePageChange,
    handleSearchChange,
    handleUpdateProduct,
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
      <ProductsTable
        products={products}
        totalPages={totalPages}
        isLoading={isFetching}
        page={page}
        onUpdateProduct={handleUpdateProduct}
        onPageChange={handlePageChange}
      />
    </>
  )
}
