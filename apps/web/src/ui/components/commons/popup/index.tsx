import type { ReactNode } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'

type PopupProps = {
  children: ReactNode
  trigger: ReactNode
}

export const Popup = ({ children, trigger }: PopupProps) => {
  return (
    <Popover placement='right' showArrow className='bg-transparent rounded-xl'>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className='bg-zinc-100'>
        <div className='px-1 py-2'>{children}</div>
      </PopoverContent>
    </Popover>
  )
}
