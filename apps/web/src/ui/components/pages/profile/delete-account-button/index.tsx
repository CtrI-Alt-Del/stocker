import { Button } from '@nextui-org/react'

import { AlertDialog } from '@/ui/components/commons/alert-dialog'
import { AdminPasswordConfirmationDialog } from '@/ui/components/commons/admin-password-confirmation-dialog'
import { useDeleteButtonAccountButton } from './use-delete-account-button'

export const DeleteAccountButton = () => {
  const { handleAdminPasswordConfirm } = useDeleteButtonAccountButton()

  return (
    <AlertDialog
      trigger={
        <AdminPasswordConfirmationDialog onConfirm={handleAdminPasswordConfirm}>
          <Button type='button' size='md' color='danger'>
            Excluir conta
          </Button>
        </AdminPasswordConfirmationDialog>
      }
      onConfirm={() => {}}
    >
      Tem certeza que deseja excluir sua conta? ESTA AÇÃO NÃO PODE SER DESFEITA!
    </AlertDialog>
  )
}
