'use client'
import { Button } from '@nextui-org/react'

import { Drawer } from '../../commons/drawer'
import { Search } from '../../commons/search'
import { RegisterCategoryForm } from './register-category-form'
import { CategoriesAccordion } from './categories-accordion'
import { useCategoryPage } from './use-categories-page'

export const CategoriesPage = () => {
  const {
    categories,
    totalPages,
    page,
    handlePageChange,
    isFetching,
    handleDeleteCategory,
    handleUpdateCategory,
    handleRegisterCategory,
  } = useCategoryPage()
  return (
    <div>
      <div className='flex flex-col gap-3 md:flex-row md:gap-0 justify-between'>
        <div className='flex-1 w-full max-w-96 space-y-2'>
          <h1 className='text-3xl font-black'>Categorias</h1>
          <Search />
        </div>

        <div className='flex items-center gap-1'>
          <Drawer
            trigger={
              <Button variant='solid' color='primary' radius='sm'>
                Adiocionar categoria
              </Button>
            }
          >
            {(closeDrawer) => (
              <RegisterCategoryForm
                onSubmit={async () => {
                  await handleRegisterCategory()
                  closeDrawer()
                }}
                onCancel={closeDrawer}
              />
            )}
          </Drawer>
        </div>
      </div>
      <div className='mt-4'>
        <CategoriesAccordion
          handleRegisterCategory={handleRegisterCategory}
          handleUpdateCategory={handleUpdateCategory}
          handleDeleteCategory={handleDeleteCategory}
          categories={categories}
          isFetching={isFetching}
          totalItems={totalPages}
          page={page}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
