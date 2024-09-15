import type { ReactNode } from 'react'
import { AccordionItem } from '@nextui-org/react'

type RootProps = {
  children: ReactNode
  id: string
  title: string
}

export const Item = ({ id, title, children }: RootProps) => {
  return (
    <AccordionItem
      key={id}
      title={title}
      aria-label={title}
      className={
        'rounded-md p-6 font-medium text-zinc-500 data-open:bg-zinc-800 data-open:text-zinc-50'
      }
    >
      {children}
    </AccordionItem>
  )
}
