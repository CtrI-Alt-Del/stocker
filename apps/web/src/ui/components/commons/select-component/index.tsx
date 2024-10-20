import { Button } from '@nextui-org/react'
import { twMerge } from 'tailwind-merge'

import { Icon } from '../icon'

type SelectComponentProps = {
  children: string
  className?: string
  onClick?: VoidFunction
}

export const SelectComponent = ({
  children,
  className,
  onClick,
}: SelectComponentProps) => {
  return (
    <Button
      onClick={onClick}
      color='default'
      variant='flat'
      className={twMerge(
        'flex justify-between items-center text-default-600 text-ellipsis h-14 -translate-y-1',
        className,
      )}
    >
      <span className='truncate whitespace-nowrap overflow-hidden'>{children}</span>
      <Icon name='arrow-down' />
    </Button>
  )
}
