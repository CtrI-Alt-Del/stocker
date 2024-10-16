import { Accordion, AccordionItem, Button, Pagination } from '@nextui-org/react'
import { Icon } from '@/ui/components/commons/icon'
import { CategoryDto } from '@stocker/core/dtos'

type CategoryInputProps = {
  handleSelectCategoryChange: (categoryId: string, categoryName: string) => void
  categoryPages: number
  handleCategoryPageChange: (page: number) => void
  totalCategoryPages: number
  categories: CategoryDto[] | []
}
export const CategoryInputComponent = ({
  handleSelectCategoryChange,
  categoryPages,
  handleCategoryPageChange,
  totalCategoryPages,
  categories,
}: CategoryInputProps) => {
  return (
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
