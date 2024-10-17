import { Icon } from '@/ui/components/commons/icon'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { Button } from '@nextui-org/react'

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
                <Button size='sm' className='bg-transparent h-10 min-w-10'>
                  <Icon name='plus' size={18} />
                </Button>
                <Button size='sm' className='bg-transparent h-10 min-w-10'>
                  <Icon name='pencil' size={18} />
                </Button>
                <Button size='sm' className='bg-transparent h-10 min-w-10'>
                  <Icon name='trash' size={18} />
                </Button>
              </div>
            }
          >
            <div>
              {category.subcategories.length > 0 ? (
                category.subcategories.map((subcategory) => (
                  <div key={category.id}>
                    <span className='' key={subcategory.id}>
                      {subcategory.name}
                    </span>
                    <Button size='sm' className='bg-transparent h-10 min-w-10'>
                      <Icon name='plus' size={18} />
                    </Button>
                    <Button size='sm' className='bg-transparent h-10 min-w-10'>
                      <Icon name='pencil' size={18} />
                    </Button>
                    <Button size='sm' className='bg-transparent h-10 min-w-10'>
                      <Icon name='trash' size={18} />
                    </Button>
                  </div>
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
