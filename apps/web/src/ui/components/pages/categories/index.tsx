'use client'

import { Button } from '@nextui-org/react'

import { Drawer } from '../../commons/drawer'
import { Search } from '../../commons/search'
import { RegisterCategoryForm } from './register-category-form'

export const CategoriesPage = () => {
  return (
    <div>
      <div className='flex-1 w-fullspace-y-2'>
        <h1 className='text-3xl font-black'>Categorias</h1>
        <div className='flex items-center gap-6 mt-6'>
          <Search />
          <div className='flex items-center gap-1'>
            <Drawer
              width={480}
              trigger={
                <Button variant='solid' color='primary' radius='sm'>
                  Adicionar Categoria
                </Button>
              }
            >
              {(closeDrawer) => (
                <RegisterCategoryForm
                  onSubmit={async () => {
                    // await handleRegisterProductFormSubmit()
                    closeDrawer()
                  }}
                  onCancel={closeDrawer}
                />
              )}
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  )
}
