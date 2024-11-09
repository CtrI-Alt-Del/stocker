'use client'

import { Icon } from '@/ui/components/commons/icon'
import { useAuthContext } from '@/ui/components/contexts/auth-context'
import { NotifcationsDialog } from './notifications-dialog'
import { UserMenu } from './user-menu'

export const NavbarUser = () => {
  const { user } = useAuthContext()

  if (user)
    return (
      <div className='flex items-center gap-2'>
        <Icon name='user' size={32} />
        <div className='flex flex-col gap-1 w-full md:w-24'>
          <strong className='text-xs truncate'>{user?.name}</strong>
          <small className='text-xs truncate'>{user?.email}</small>
        </div>
        <div className='flex flex-col h-12'>
          <NotifcationsDialog companyId={user.companyId} />
          <UserMenu />
        </div>
      </div>
    )
}
