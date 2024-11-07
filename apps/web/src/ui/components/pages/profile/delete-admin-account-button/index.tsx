import { AlertDialog } from "@/ui/components/commons/alert-dialog"
import { Button } from "@nextui-org/react"
import { useDeleteAdminAccount } from "./use-delete-admin-account-button"
import { useAuthContext } from "@/ui/components/contexts/auth-context"

export const DeleteAdminAccount = () => {
    const { user } = useAuthContext()
    const userId = user ? user.id : ""
    const { handleDeleteAdminAccountButtonClick } = useDeleteAdminAccount(userId)
  
    return (
        <AlertDialog
          trigger={
            <Button
              size='md'
              color='danger'
              className="ml-2"
            >
              Excluir conta
            </Button>
          }
          onConfirm={handleDeleteAdminAccountButtonClick}
        >
          Tem certeza que deseja excluir sua conta? ESTA AÇÃO NÃO PODE SER DESFEITA!
        </AlertDialog>
    )
  }