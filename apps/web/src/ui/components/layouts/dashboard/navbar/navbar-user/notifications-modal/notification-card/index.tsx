import { Button, Link } from '@nextui-org/react'

import { Datetime } from '@stocker/core/libs'

import { Icon } from '@/ui/components/commons/icon'
import type { IconName } from '@/ui/components/commons/icon/types'

type NotificationCardProps = {
  id: string
  title: string
  href: string
  icon: IconName
  createdAt: Date
  onRemove: (notificationId: string) => void
}

export const NotificationCard = ({
  id,
  title,
  icon,
  createdAt,
  href,
  onRemove,
}: NotificationCardProps) => {
  return (
    <div className='pt-2'>
      <div className='flex items-center gap-2'>
        <div className='grid place-content-center p-2 rounded-md bg-zinc-100'>
          <Icon name={icon} className='text-zinc-500' />
        </div>
        <div className='flex items-center gap-2'>
          <time dateTime={createdAt.toDateString()} className='text-zinc-400 text-sm'>
            {new Datetime(createdAt).format('DD/MM/YYYY')}
          </time>
          -<h3 className='truncate w-72 text-gray-500'>{title}</h3>
        </div>
      </div>
      <div className='flex items-center gap-3 mt-2 ml-12'>
        <Button
          as={Link}
          size='sm'
          color='primary'
          href={href}
          endContent={<Icon name='link' size={16} />}
        >
          Acessar
        </Button>
        <Button size='sm' onClick={() => onRemove(id)} className='bg-zinc-100'>
          Remover
        </Button>
      </div>
    </div>
  )
}
