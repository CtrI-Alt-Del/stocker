import { Accordion, AccordionItem, Button, Pagination, Spinner } from '@nextui-org/react'
import { motion } from 'framer-motion'

import { Icon } from '@/ui/components/commons/icon'
import { Select } from '@/ui/components/commons/select'
import { Dialog } from '../dialog'
import { useCategorySelect } from './use-category-select'

type CategorySelectProps = {
  defeaultCategoryId?: string
  className?: string
  onSelectChange: (categoryId: string) => void
  mode?: 'filter' | 'select'
}

export const CategorySelect = ({
  className,
  defeaultCategoryId,
  onSelectChange,
  mode = 'select',
}: CategorySelectProps) => {
  const {
    categories,
    isFetching,
    page,
    totalPages,
    selectedCategoryName,
    expandedItems,
    handleCategoryIdChange,
    handleAccordionClick,
    handleCategoryPageChange,
  } = useCategorySelect(onSelectChange, defeaultCategoryId)

  return isFetching ? (
    <Spinner size='sm' className='w-full h-12 mx-auto' />
  ) : (
    <div className='space-y-2 flex gap-4 items-center'>
      <Dialog
        title='Selecione uma categoria ou subcategoria'
        size='2xl'
        trigger={
          <Select className={className}>
            {selectedCategoryName ? selectedCategoryName : 'Selecione categoria'}
          </Select>
        }
      >
        {(closeDrawer) => (
          <div className='flex flex-col h-[28rem] pb-6'>
            {categories.length === 0 && (
              <p className='text-center text-bg-zinc-600 font-semibold my-12'>
                Nenhuma categoria registrada.
              </p>
            )}
            {categories.length > 0 && (
              <Accordion selectionMode='multiple'>
                {categories.map((category) => (
                  <AccordionItem
                    indicator={
                      <Button
                        className='bg-transparent hover:bg-primary hover:text-white duration-1000 border-zinc-400 h-10 min-w-10'
                        onClick={() => {
                          handleCategoryIdChange(category.id)
                          closeDrawer()
                        }}
                      >
                        <Icon name='plus' size={18} />
                      </Button>
                    }
                    key={category.id}
                    title={category.name}
                    disableIndicatorAnimation
                    startContent={
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: expandedItems[category.id] ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon name='arrow-up' size={18} className='rotate-90' />
                      </motion.div>
                    }
                    onClick={() => handleAccordionClick(category.id)}
                  >
                    <div className='flex gap-1 flex-col sm:ml-4 ml-0 -translate-y-3'>
                      {category.subCategories.length > 0 ? (
                        category.subCategories.map((subCategory) => (
                          <div
                            key={subCategory.id}
                            className='flex flex-1 justify-between items-center ml-6'
                          >
                            <p>{subCategory.name}</p>
                            <Button
                              className='bg-transparent hover:bg-primary hover:text-white duration-1000 border-zinc-400 h-10 min-w-10'
                              onClick={() => {
                                handleCategoryIdChange(subCategory.id)
                                closeDrawer()
                              }}
                            >
                              <Icon name='plus' size={18} />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p>Nenhuma subcategoria cadastrada</p>
                      )}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
            {totalPages > 1 && (
              <div className='flex flex-1 items-end '>
                <Pagination
                  page={page}
                  total={totalPages}
                  onChange={handleCategoryPageChange}
                  aria-label='Paginação de categorias'
                  showControls
                />
              </div>
            )}
          </div>
        )}
      </Dialog>
      {selectedCategoryName && mode === 'filter' && (
        <button
          type='button'
          onClick={() => handleCategoryIdChange('')}
          className='flex justify-center items-center gap-2 text-xs text-gray-400'
        >
          Remover filtro
          <Icon name='close' className='size-4' />{' '}
        </button>
      )}
    </div>
  )
}
