'use client'

import { Accordion, AccordionItem } from '@nextui-org/react'
import { PlusIcon } from '@heroicons/react/24/solid'
import { Button } from '@nextui-org/react'

export const CategoriesAccordion = () => {
  const defaultContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

  const handlePlusIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
  }

  return (
    <div className=''>
      <Accordion>
        <AccordionItem
          key='1'
          aria-label='Accordion 1'
          title='Accordion 1'
          indicator={
            <Button
              onClick={handlePlusIconClick}
              className='bg-[#ebebeb] h-[52px] w-[52px] min-w-[52px]'
            >
              <PlusIcon className='' />
            </Button>
          }
        >
          {defaultContent}
        </AccordionItem>
        <AccordionItem
          key='2'
          aria-label='Accordion 2'
          title='Accordion 2'
          indicator={
            <Button
              onClick={handlePlusIconClick}
              className='bg-[#ebebeb] h-[52px] w-[52px] min-w-[52px]'
            >
              <PlusIcon className='' />
            </Button>
          }
        >
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  )
}
