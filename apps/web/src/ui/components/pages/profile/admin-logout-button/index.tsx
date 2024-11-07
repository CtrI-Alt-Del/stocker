import { AlertDialog } from "@/ui/components/commons/alert-dialog"
import { Button } from "@nextui-org/react"
import { Icon } from "@/ui/components/commons/icon"
import { useAdminLogoutButton } from "./use-admin-logout-button"

export const AdminLogoutButton = () => {
    const { handleLogoutButtonClick } = useAdminLogoutButton()
  
    return (
        <AlertDialog
          trigger={
            <Button
              size='md'
              color='default'
              startContent={<Icon name='logout' size={14} />}
            >
              Sair
            </Button>
          }
          onConfirm={handleLogoutButtonClick}
        >
          Tem certeza que deseja sair?
        </AlertDialog>
    )
  }