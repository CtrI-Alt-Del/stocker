'use client'

import { Button } from '@nextui-org/react'

import { Drawer } from '../../commons/drawer'
import { Search } from '../../commons/search'
import { RegisterCategoryForm } from './register-category-form'
import { CategoriesAccordion } from './categories-accordion'

export const CategoriesPage = () => {
  return (
    <div>
      <div className='flex flex-col gap-3 md:flex-row md:gap-0 justify-between'>
        <div className='flex-1 w-full max-w-96 space-y-2'>
          <h1 className='text-3xl font-black'>Produtos</h1>
          <Search />
        </div>

        <div className='flex items-center gap-1'>
          <Drawer
            trigger={
              <Button variant='solid' color='primary' radius='sm'>
                Adicionar produto
              </Button>
            }
          >
            {(closeDrawer) => (
              <RegisterCategoryForm
                onSubmit={async () => {
                  closeDrawer()
                }}
                onCancel={closeDrawer}
              />
            )}
          </Drawer>
        </div>
      </div>
      <div className='mt-4'>
        <CategoriesAccordion />
      </div>
    </div>
  )
}
