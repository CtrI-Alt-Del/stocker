import { Button } from '@nextui-org/react'
import { twMerge } from 'tailwind-merge'

import type { IconName } from '../icon/types'
import { Icon } from '../icon'
import { Tag } from '../tag'

type IconButton = {
  name: IconName
  size?: number
  onClick?: () => void
  className?: string
  tag?: string
}

export const IconButton = ({ name, size, className, tag, onClick }: IconButton) => {
  return (
    <>
      <Button
        isIconOnly
        aria-label='OPA'
        onClick={onClick}
        className={twMerge('relative bg-transparent overflow-visible', className)}
        size='sm'
      >
        <Icon name={name} size={size} />
        {tag && (
          <Tag type='danger' size='sm' className='absolute right-0 -top-3'>
            {tag}
          </Tag>
        )}
      </Button>
    </>
  )
}
