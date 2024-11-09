import { Button } from '@nextui-org/react'

import { Datetime } from '@stocker/core/libs'

import { Icon } from '@/ui/components/commons/icon'
import type { IconName } from '@/ui/components/commons/icon/types'
import { useAuthContext } from '@/ui/components/contexts/auth-context'
import Link from 'next/link'

type NotificationCardProps = {
  id: string
  title: string
  href: string
  icon: IconName
  sentAt: Date
  onDelete: (notificationId: string) => void
}

export const NotificationCard = ({
  id,
  title,
  icon,
  sentAt,
  href,
  onDelete,
}: NotificationCardProps) => {
  const { user } = useAuthContext()

  return (
    <div className='pt-2'>
      <div className='flex items-center gap-2'>
        <div className='grid place-content-center p-2 rounded-md bg-zinc-100'>
          <Icon name={icon} className='text-zinc-500' />
        </div>
        <div className='flex items-center gap-2'>
          <time dateTime={sentAt.toString()} className='text-zinc-400 text-sm truncate'>
            {new Datetime(sentAt).format('DD/MM/YYYY HH:mm')}
          </time>
          -<h3 className='truncate text-gray-500 max-w-72'>{title}</h3>
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
        {user?.hasValidRole('manager') && (
          <Button size='sm' onClick={() => onDelete(id)} className='bg-zinc-100'>
            Remover
          </Button>
        )}
      </div>
    </div>
  )
}
