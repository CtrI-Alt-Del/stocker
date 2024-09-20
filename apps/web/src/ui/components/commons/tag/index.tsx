import { Chip } from '@nextui-org/react'
import { string } from 'zod'

type TagType = {
  type: 'sucess' | 'danger' | 'warning'
  children: string
}
export const Tag = ({ type, children }: TagType) => {
  switch (type) {
    case 'sucess':
      return <Chip color='success' className='bg-opacity-20 text-green-600'>{children}</Chip>
    
    case 'danger':
      return <Chip color='danger' className='bg-opacity-20 text-red-600'>{children}</Chip>

    case 'warning':
      return <Chip color='warning' className='bg-opacity-20 text-yellow-500'>{children}</Chip>
     default:
    return <h1>Type not exits!</h1>
  }
}
