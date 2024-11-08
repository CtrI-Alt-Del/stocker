import Link from 'next/link'
import { Button } from '@nextui-org/react'

import { AlertDialog } from '@/ui/components/commons/alert-dialog'
import { IconButton } from '@/ui/components/commons/icon-button'
import { Popup } from '@/ui/components/commons/popup'
import { Icon } from '@/ui/components/commons/icon'
import { useUserMenu } from './use-user-menu'
import { ROUTES } from '@/constants'

export const UserMenu = () => {
  const { handleLogoutButtonClick } = useUserMenu()

  return (
    <Popup trigger={<IconButton name='ellipses' size={16} />}>
      <div className='flex flex-col gap-2'>
        <Button
          as={Link}
          href={ROUTES.profile}
          size='sm'
          color='primary'
          startContent={<Icon name='user' size={14} />}
        >
          Perfil
        </Button>
        <AlertDialog
          trigger={
            <Button
              size='sm'
              color='primary'
              startContent={<Icon name='logout' size={14} />}
            >
              Sair
            </Button>
          }
          onConfirm={handleLogoutButtonClick}
        >
          Tem certeza que deseja sair?
        </AlertDialog>
      </div>
    </Popup>
  )
}
