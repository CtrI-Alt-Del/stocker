import Link from 'next/link'
import { Icon } from '@/ui/components/commons/icon'
import type { IconName } from '@/ui/components/commons/icon/types'

type CardProps = {
  title: string
  value: string | number
  href: string
  icon: IconName
}

export const Card = ({ title, value, icon, href }: CardProps) => {
  return (
    <>
      <div className='flex-grow flex-shrink w-full'>
        <div className='max-w-full shadow-md flex justify-between rounded-lg p-6'>
          <div className='flex items-center gap-3 justify-start h-full'>
            <Icon
              name={icon}
              className='size-10 bg-default-200 text-foreground-500 rounded-lg p-2'
            />
            <div className='flex flex-col flex-1'>
              <h2 className='text-default-400 flex text-sm font-medium'>{title}</h2>
              <span className='text-default-700 text-2xl font-medium'>{value}</span>
            </div>
          </div>
          <div>
            <Link href={href}>
              <Icon name='link' className='text-default-400 size-4 ml-2' />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
