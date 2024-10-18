import { Icon } from '@/ui/components/commons/icon'
import { Accordion, AccordionItem, Button, Pagination, Spinner } from '@nextui-org/react'
import { useCategoryPage } from '../use-categories-page'
import { Category } from '@stocker/core/entities'
import { Drawer } from '@/ui/components/commons/drawer'
import { RegisterCategoryForm } from '../register-category-form'
import { CategoryDto } from '@stocker/core/dtos'
import { AlertDialog } from '@/ui/components/commons/alert-dialog'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { UpdateCategoryForm } from '../update-category-form'

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
                onKeyUp={(e) => e.stopPropagation()}
                key={category.id}
                onKeyDown={(e) => e.stopPropagation()}
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
                        <Drawer
                          trigger={
                            <Button
                              size='sm'
                              className='bg-transparent hover:bg-primary hover:text-white duration-1000 border-zinc-400 h-10 min-w-10'
                            >
                              <Icon name='plus' size={18} />
                            </Button>
                          }
                        >
                          {(closeDrawer) => (
                            <RegisterCategoryForm
                              parentCategoryId={category.id}
                              onSubmit={async () => {
                                await handleRegisterCategory
                                closeDrawer()
                              }}
                              onCancel={closeDrawer}
                            />
                          )}
                        </Drawer>
                        <Drawer
                          trigger={
                            <Button
                              size='sm'
                              className='bg-transparent hover:bg-primary hover:text-white duration-1000 border-zinc-400 h-10 min-w-10'
                            >
                              <Icon name='pencil' size={18} />
                            </Button>
                          }
                        >
                          {(closeDrawer) => (
                            <UpdateCategoryForm
                              category={category}
                              onSubmit={handleUpdateCategory}
                              onCancel={closeDrawer}
                            />
                          )}
                        </Drawer>
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
                          <Drawer
                            trigger={
                              <Button
                                size='sm'
                                className='bg-transparent hover:bg-primary hover:text-white duration-1000 border-zinc-400 h-10 min-w-10'
                              >
                                <Icon name='pencil' size={18} />
                              </Button>
                            }
                          >
                            {(closeDrawer) => (
                              <UpdateCategoryForm
                                category={subcategory}
                                onSubmit={handleUpdateCategory}
                                onCancel={closeDrawer}
                              />
                            )}
                          </Drawer>
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
          <Pagination page={page} onChange={handlePageChange} total={totalItems} />
        </div>
      )}
    </div>
  )
}
