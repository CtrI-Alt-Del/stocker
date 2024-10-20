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
}

export const CategorySelect = ({
  className,
  defeaultCategoryId,
  onSelectChange,
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
    <Spinner label='Carregando...' className='w-full h-full mx-auto' />
  ) : (
    <div className='space-y-2'>
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
          <>
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
                  <div className='flex gap-2 flex-col sm:ml-4 ml-0'>
                    {category.subCategories.length > 0 ? (
                      category.subCategories.map((subCategory) => (
                        <div
                          key={subCategory.id}
                          className='flex flex-1 justify-between items-center'
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
            {totalPages !== 1 && (
              <Pagination
                page={page}
                total={totalPages}
                onChange={handleCategoryPageChange}
                aria-label='K.F esteve aqui!!!'
                showControls
              />
            )}
          </>
        )}
      </Dialog>
    </div>
  )
}
