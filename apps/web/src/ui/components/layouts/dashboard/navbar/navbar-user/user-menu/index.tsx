import { AlertDialog } from '@/ui/components/commons/alert-dialog'
import { IconButton } from '@/ui/components/commons/icon-button'
import { Popup } from '@/ui/components/commons/popup'
import { Button } from '@nextui-org/react'
import { useUserMenu } from './use-user-menu'
import { Icon } from '@/ui/components/commons/icon'

export const UserMenu = () => {
  const { handleLogoutButtonClick } = useUserMenu()

  return (
    <Popup trigger={<IconButton name='ellipses' size={16} />}>
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
    </Popup>
  )
}
