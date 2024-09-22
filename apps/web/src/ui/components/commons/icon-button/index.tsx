import { Button, Tooltip } from '@nextui-org/react'
import { twMerge } from 'tailwind-merge'

import type { IconName } from '../icon/types'
import { Icon } from '../icon'

type IconButton = {
  name: IconName
  size?: number
  onClick?: () => void
  className?: string
  tooltip?: string
}

export const IconButton = ({ tooltip, name, size, className, onClick }: IconButton) => {
  return (
    <>
      <Button
        isIconOnly
        aria-label='OPA'
        onClick={onClick}
        className={twMerge('bg-transparent', className)}
        size='sm'
      >
        <Icon name={name} size={size} />
      </Button>
    </>
  )
}
