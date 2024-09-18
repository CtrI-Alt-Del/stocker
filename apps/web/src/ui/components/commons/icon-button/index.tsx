import { Button, Select, SelectItem } from '@nextui-org/react'

import type { IconName } from '../icon/types'
import { Icon } from '../icon'

type IconButton = {
  name: IconName
  size?: number
  onClick?: () => void
}

export const IconButton = ({ name, size, onClick }: IconButton) => {
  return (
    <>
      <Button isIconOnly onClick={onClick} className='bg-transparent' size='sm'>
        <Icon name={name} size={size} />
      </Button>
      <Select>
        <SelectItem>OPA</SelectItem>
      </Select>
    </>
  )
}
