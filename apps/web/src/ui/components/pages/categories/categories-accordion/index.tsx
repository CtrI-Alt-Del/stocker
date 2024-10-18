import { Icon } from '@/ui/components/commons/icon'
import { Accordion, AccordionItem, Button, Pagination, Spinner } from '@nextui-org/react'
import { useCategoryPage } from '../use-categories-page'
import { Category } from '@stocker/core/entities'
import { Drawer } from '@/ui/components/commons/drawer'
import { RegisterCategoryForm } from '../register-category-form'
import { CategoryDto } from '@stocker/core/dtos'
import { AlertDialog } from '@/ui/components/commons/alert-dialog'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { UpdateCategoryForm } from '../update-category-form'
import { useCategoriesAccordion } from './use-categories-accordion'
import { DrawerRef } from '@/ui/components/commons/drawer/types'

type CategoryAccordionProps = {
  categories: CategoryDto[]
  totalItems: number
  page: number
  handlePageChange: (page: number) => void
  handleUpdateCategory: VoidFunction
  handleDeleteCategory: (categoryId: string) => void
  handleRegisterCategory: VoidFunction
  isFetching: boolean
}

export const CategoriesAccordion = ({
  categories,
  totalItems,
  page,
  handleUpdateCategory,
  handlePageChange,
  isFetching,
  handleRegisterCategory,
  handleDeleteCategory,
}: CategoryAccordionProps) => {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const drawerRef = useRef<DrawerRef>(null)
  const registerDrawerRef = useRef<DrawerRef>(null)
  const {
    categoryBeingEditted,
    handleEditCategoryButtonClick,
    handleUpdateCategoryFormSubmit,
    handleCancelEditting,
    handleDrawerClose,
    parentCategoryId,
    handleRegisterSubCategoryFormSubmit,
    handleRegisterSubCategoryButtonClick,
  } = useCategoriesAccordion({
    registerDrawerRef,
    onRegisterSubCategory: handleRegisterCategory,
    categories,
    drawerRef,
    onUpdateCategory: handleUpdateCategory,
  })

  return (
    <div>
      {isFetching ? (
        <div>
          <Spinner label='Carregando...' className='w-full h-full mx-auto' />
        </div>
      ) : (
        <div className='space-y-2'>
          <Accordion selectionMode='multiple'>
            {categories.map((category) => (
              <AccordionItem
                key={category.id}
                aria-label={category.name}
                startContent={
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: expandedItems[category.id || ''] ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon name='arrow-up' size={18} className='rotate-90' />
                  </motion.div>
                }
                hideIndicator
                title={
                  <div className='flex justify-between w-full items-center gap-2'>
                    <p>{category.name}</p>
                    <div className='flex space-x-2'>
                      <div className='flex space-x-2 m-0'>
                        <Button
                          size='sm'
                          className='bg-transparent hover:bg-primary hover:text-white duration-1000 border-zinc-400 h-10 min-w-10'
                          onClick={() =>
                            handleRegisterSubCategoryButtonClick(category.id || '')
                          }
                        >
                          <Icon name='plus' size={18} />
                        </Button>
                        <Button
                          size='sm'
                          onClick={() => handleEditCategoryButtonClick(category)}
                          className='bg-transparent hover:bg-primary hover:text-white duration-1000 border-zinc-400 h-10 min-w-10'
                        >
                          <Icon name='pencil' size={18} />
                        </Button>
                        <AlertDialog
                          trigger={
                            <Button
                              size='sm'
                              className='bg-transparent hover:bg-primary hover:text-white hover:transition-all transition-all duration-1000 border-zinc-400 h-10 min-w-10'
                            >
                              <Icon name='trash' size={18} />
                            </Button>
                          }
                          onConfirm={() => {
                            handleDeleteCategory(category.id || '')
                          }}
                        >
                          Você tem certeza que deseja deletar essa categoria?
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                }
                onClick={() => toggleItem(category.id || '')}
              >
                <div className='flex gap-2 flex-col sm:ml-4 ml-0'>
                  {category.subCategories.length > 0 ? (
                    category.subCategories.map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className='flex justify-between items-center'
                      >
                        <p>{subcategory.name}</p>
                        <div className='flex gap-2'>
                          <Button
                            size='sm'
                            className='bg-transparent hover:bg-primary hover:text-white duration-1000 border-zinc-400 h-10 min-w-10'
                            onClick={() => handleEditCategoryButtonClick(subcategory)}
                          >
                            <Icon name='pencil' size={18} />
                          </Button>
                          <AlertDialog
                            trigger={
                              <Button
                                size='sm'
                                className='bg-transparent hover:bg-primary hover:text-white hover:transition-all transition-all duration-1000 border-zinc-400 h-9 min-w-8'
                              >
                                <Icon name='trash' size={14} />
                              </Button>
                            }
                            onConfirm={() => {
                              handleDeleteCategory(subcategory.id || '')
                            }}
                          >
                            Você tem certeza que deseja deletar essa subcategoria?
                          </AlertDialog>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Sem subcategorias</p>
                  )}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
          {totalItems > 1 && (
            <Pagination page={page} onChange={handlePageChange} total={totalItems} />
          )}
        </div>
      )}
      <Drawer ref={drawerRef} trigger={null} onClose={handleDrawerClose}>
        {() =>
          categoryBeingEditted && (
            <UpdateCategoryForm
              category={categoryBeingEditted}
              onSubmit={handleUpdateCategoryFormSubmit}
              onCancel={handleCancelEditting}
            />
          )
        }
      </Drawer>
      <Drawer ref={registerDrawerRef} trigger={null} onClose={handleDrawerClose}>
        {() =>
          parentCategoryId && (
            <RegisterCategoryForm
              parentCategoryId={parentCategoryId}
              onSubmit={handleRegisterSubCategoryFormSubmit}
              onCancel={handleCancelEditting}
            />
          )
        }
      </Drawer>
    </div>
  )
}
