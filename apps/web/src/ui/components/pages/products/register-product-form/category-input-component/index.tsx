import { Accordion, AccordionItem, Button, Pagination, Spinner } from '@nextui-org/react'
import { Icon } from '@/ui/components/commons/icon'
import { CategoryDto } from '@stocker/core/dtos'
import { SquarePiIcon } from 'lucide-react'
import { Product } from '@stocker/core/entities'

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
  return isCategoryLoading ? (
    <Spinner label='Carregando...' className='w-full h-full mx-auto' />
  ) : (
    <div className='space-y-2'>
      <Accordion>
        {categories.map((category) => (
          <AccordionItem key={category.id} title={category.name}>
            <button
              onClick={() => {
                handleSelectCategoryChange(category.id || '', category.name || '')
              }}
              className='flex flex-1 gap-3 items-center justify-start'
              type='button'
            >
              {category.name}
              <Icon name='plus' className='text-zinc-400 size-5' />
            </button>
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
