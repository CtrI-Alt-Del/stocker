import { Chip } from '@nextui-org/react'
import { twMerge } from 'tailwind-merge'

type TagProps = {
  type: 'sucess' | 'danger' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  children: string
  className?: string
}
export const Tag = ({ type, size, children, className }: TagProps) => {
  switch (type) {
    case 'sucess':
      return (
        <Chip
          color='success'
          size={size}
          className={twMerge('bg-opacity-20 text-green-600', className)}
        >
          {children}
        </Chip>
      )

    case 'danger':
      return (
        <Chip
          color='danger'
          size={size}
          className={twMerge('bg-opacity-20 text-red-600', className)}
        >
          {children}
        </Chip>
      )

    case 'warning':
      return (
        <Chip
          color='warning'
          size={size}
          className={twMerge('bg-opacity-20 text-yellow-500', className)}
        >
          {children}
        </Chip>
      )
    default:
      return (
        <Chip color='success' className='bg-opacity-20 text-green-600'>
          {children}
        </Chip>
      )
  }
}
