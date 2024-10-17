import { Icon } from '@/ui/components/commons/icon'
import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import { useState } from 'react'

type Category = {
  id: string
  name: string
  subcategories: { id: string; name: string }[]
}

interface AccordionState {
  [key: string]: boolean
}

export const CategoriesAccordion = () => {
  const [isOpen, setIsOpen] = useState<AccordionState>({});

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
  ];

  const AnimationUp = `
    transition
    duration-150
  `;

  const AnimationDown = `
    -rotate-90
    transition
    duration-150
  `;

  function toggleAnimation(categoryId: string) {
    setIsOpen(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  }

  return (
    <div>
      <Accordion selectionMode='multiple'>
        {categoryContent.map((category) => (
          <AccordionItem
            onPress={() => toggleAnimation(category.id)}
            key={category.id}
            aria-label={category.name}
            title={
              <div className='flex justify-start items-center gap-2'>
                <Icon
                  name="arrow-down"
                  size={20}
                  className={`${isOpen[category.id] ? AnimationUp : AnimationDown} text-zinc-700`}
                />
                <p>{category.name}</p>
              </div>
            }
            disableIndicatorAnimation
            indicator={
              <div className='flex space-x-2'>
                <div className='flex space-x-2 m-0'>
                  <Button size='sm' className='bg-transparent hover:bg-primary hover:text-white hover:transition-all transition-all duration-1000 border-zinc-400 h-10 min-w-10'>
                    <Icon name='plus' size={18} />
                  </Button>
                  <Button size='sm' className='bg-transparent hover:bg-primary hover:text-white hover:transition-all transition-all duration-1000 border-zinc-400 h-10 min-w-10'>
                    <Icon name='pencil' size={18} />
                  </Button>
                  <Button size='sm' className='bg-transparent hover:bg-primary hover:text-white hover:transition-all transition-all duration-1000 border-zinc-400 h-10 min-w-10'>
                    <Icon name='trash' size={18} />
                  </Button>
                </div>
              </div>
            }
          >
            <div className='flex gap-2 flex-col sm:ml-4 ml-0'>
              {category.subcategories.length > 0 ? (
                category.subcategories.map((subcategory) => (
                  <div key={subcategory.id} className='flex justify-between items-center'>
                    <p key={subcategory.id}>{subcategory.name}</p>
                    <div className='flex gap-2'>
                      <Button size='sm' className='bg-transparent hover:bg-primary hover:text-white hover:transition-all transition-all duration-1000 border-zinc-400 h-9 min-w-8'>
                        <Icon name='plus' size={14} />
                      </Button>
                      <Button size='sm' className='bg-transparent hover:bg-primary hover:text-white hover:transition-all transition-all duration-1000 border-zinc-400 h-9 min-w-8'>
                        <Icon name='pencil' size={14} />
                      </Button>
                      <Button size='sm' className='bg-transparent hover:bg-primary hover:text-white hover:transition-all transition-all duration-1000 border-zinc-400 h-9 min-w-8'>
                        <Icon name='trash' size={14} />
                      </Button>
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
    </div>
  )
}
