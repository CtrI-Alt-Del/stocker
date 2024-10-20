import { Button } from '@nextui-org/react'
import { twMerge } from 'tailwind-merge'

import { Icon } from '../icon'

type SelectProps = {
  children: string
  className?: string
  onClick?: VoidFunction
}

export const Select = ({ children, className, onClick }: SelectProps) => {
  return (
    <Button
      onClick={onClick}
      color='default'
      variant='flat'
      className={twMerge(
        'flex justify-between items-center text-default-600 text-ellipsis h-14',
        className,
      )}
    >
      <span className='truncate whitespace-nowrap overflow-hidden'>{children}</span>
      <Icon name='arrow-down' size={20} />
    </Button>
  )
}
