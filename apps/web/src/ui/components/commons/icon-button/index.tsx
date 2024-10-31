import { type ForwardedRef, forwardRef } from 'react'
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

const IconButtonComponent = (
  { name, size, className, tag, onClick, ...buttonProps }: IconButton,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <Button
      ref={ref}
      isIconOnly
      aria-label='OPA'
      onClick={onClick}
      className={twMerge('relative bg-transparent overflow-visible', className)}
      size='sm'
      {...buttonProps}
    >
      <Icon name={name} size={size} />
      {tag && (
        <Tag type='danger' size='sm' className='absolute right-0 -top-3'>
          {tag}
        </Tag>
      )}
    </Button>
  )
}

export const IconButton = forwardRef(IconButtonComponent)
