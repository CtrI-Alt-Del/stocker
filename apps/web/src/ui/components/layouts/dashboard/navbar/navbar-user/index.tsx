import { Icon } from '@/ui/components/commons/icon'
import { Avatar, Button } from '@nextui-org/react'

export const NavbarUser = () => {
  return (
    <div className='flex items-center gap-2'>
      <Avatar
        className='transition-transform flex-shrink-0'
        color='secondary'
        name='Jason Hughes'
        src='https://i.pravatar.cc/150?u=a042581f4e28026704d'
      />
      <div className='flex flex-col gap-1'>
        <strong className='text-xs'>Hector Bonilha</strong>
        <small className='text-xs'>hecto@gmail.com</small>
      </div>
      <div className='flex flex-col h-12'>
        <Button isIconOnly className='bg-transparent text-zinc-700' size='sm'>
          <Icon name='notification' size={16} />
        </Button>
        <Button isIconOnly className='bg-transparent text-zinc-700' size='sm'>
          <Icon name='ellipses' size={16} />
        </Button>
      </div>
    </div>
  )
}
