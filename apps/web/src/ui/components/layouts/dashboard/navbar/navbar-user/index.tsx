import { IconButton } from '@/ui/components/commons/icon-button'
import { Avatar } from '@nextui-org/react'

export const NavbarUser = () => {
  return (
    <div className='flex items-center gap-2'>
      <Avatar
        className='transition-transform flex-shrink-0'
        color='secondary'
        name='Jason Hughes'
        src='https://i.pravatar.cc/150?u=a042581f4e28026704d'
      />
      <div className='flex flex-col gap-1 w-full md:w-24'>
        <strong className='text-xs truncate'>Hector Bonilha</strong>
        <small className='text-xs truncate'>hecto@gmail.com</small>
      </div>
      <div className='flex flex-col h-12'>
        <IconButton name='notification' size={16} />
        <IconButton name='ellipses' size={16} />
      </div>
    </div>
  )
}
