import { Icon } from '@/ui/components/commons/icon'
import { IconButton } from '@/ui/components/commons/icon-button'
import { NotifcationsDialog } from './notifications-modal'

export const NavbarUser = () => {
  return (
    <div className='flex items-center gap-2'>
      <Icon name='user' size={32} />
      <div className='flex flex-col gap-1 w-full md:w-24'>
        <strong className='text-xs truncate'>Hector Bonilha</strong>
        <small className='text-xs truncate'>hecto@gmail.com</small>
      </div>
      <div className='flex flex-col h-12'>
        <NotifcationsDialog />
        <IconButton name='ellipses' size={16} />
      </div>
    </div>
  )
}
