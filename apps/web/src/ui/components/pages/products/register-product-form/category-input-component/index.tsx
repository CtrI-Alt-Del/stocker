import { Accordion, AccordionItem, Button, Pagination, Spinner } from '@nextui-org/react'
import { Icon } from '@/ui/components/commons/icon'
import { CategoryDto } from '@stocker/core/dtos'
import { motion } from 'framer-motion'
import { useState } from 'react'

type CategoryInputProps = {
  handleSelectCategoryChange: (categoryId: string, categoryName: string) => void
  categoryPages: number
  handleCategoryPageChange: (page: number) => void
  totalCategoryPages: number
  categories: CategoryDto[] | []
  isCategoryLoading: boolean
}

export const CategoryInputComponent = ({
  handleSelectCategoryChange,
  categoryPages,
  handleCategoryPageChange,
  totalCategoryPages,
  categories,
  isCategoryLoading,
}: CategoryInputProps) => {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return isCategoryLoading ? (
    <Spinner label='Carregando...' className='w-full h-full mx-auto' />
  ) : (
    <div className='space-y-2'>
      <Accordion selectionMode='multiple'>
        {categories.map((category) => (
          <AccordionItem
            indicator={
              <Button
                className='bg-transparent hover:bg-primary hover:text-white duration-1000 border-zinc-400 h-10 min-w-10'
                onClick={() => {
                  handleSelectCategoryChange(category.id || '', category.name)
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
                animate={{ rotate: expandedItems[category.id || ''] ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Icon name='arrow-up' size={18} className='rotate-90' />
              </motion.div>
            }
            onClick={() => toggleItem(category.id || '')}
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
                      onClick={() =>
                        handleSelectCategoryChange(subCategory.id || '', subCategory.name)
                      }
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
      <Pagination
        page={categoryPages}
        total={totalCategoryPages}
        onChange={handleCategoryPageChange}
        aria-label='K.F esteve aqui!!!'
        showControls
      />
    </div>
  )
}
