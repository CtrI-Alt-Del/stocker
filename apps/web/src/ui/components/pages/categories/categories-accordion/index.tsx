'use client'

import { Accordion, AccordionItem } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { Pencil, Plus, Trash2 } from 'lucide-react'

type Category = {
  id: string
  name: string
  subcategories: { id: string; name: string }[]
}

export const CategoriesAccordion = () => {
  const categoryContent: Category[] = [
    {
      id: '1',
      name: 'Categoria 1',
      subcategories: [
        { id: '1-1', name: 'Subcategoria 1-1' },
        { id: '1-2', name: 'Subcategoria 1-2' },
      ],
    },
    {
      id: '2',
      name: 'Categoria 2',
      subcategories: [],
    },
  ]

  return (
    <div>
      <Accordion selectionMode='multiple'>
        {categoryContent.map((category) => (
          <AccordionItem
            key={category.id}
            aria-label={category.name}
            title={category.name}
            disableIndicatorAnimation
            indicator={
              <div className='flex space-x-2'>
                <Button className='bg-[#FAFAFA] h-14 w-14 min-w-14 '>
                  <Plus />
                </Button>
                <Button className='bg-[#FAFAFA] h-14 w-14 min-w-14 '>
                  <Pencil />
                </Button>
                <Button className='bg-[#FAFAFA] h-14 w-14 min-w-14 '>
                  <Trash2 />
                </Button>
              </div>
            }
          >
            <div>
              {category.subcategories.length > 0 ? (
                category.subcategories.map((subcategory) => (
                  <p key={subcategory.id}>{subcategory.name}</p>
                ))
              ) : (
                <p>Sem subcategorias</p>
              )}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
