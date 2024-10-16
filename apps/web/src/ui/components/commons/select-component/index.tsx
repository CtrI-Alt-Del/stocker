import { Button } from '@nextui-org/react'
import { Icon } from '../icon'

type SelectComponentProps = {
  children: string
  onClick?: VoidFunction
  size?: 'full' | 'lg'
}

export const SelectComponent = ({ children, onClick, size }: SelectComponentProps) => {
  // Determine the size class based on the size prop
  const sizeClass = size === 'full' ? 'w-full h-full' : ''

  return (
    <Button
      onClick={onClick}
      color='default'
      variant='flat'
      className={`flex justify-between items-center text-default-600 ${sizeClass}`}
    >
      <p className='truncate whitespace-nowrap overflow-hidden text-ellipsis min-w-0'>
        {children}
      </p>
      <Icon name='arrow-down' />
    </Button>
  )
}

