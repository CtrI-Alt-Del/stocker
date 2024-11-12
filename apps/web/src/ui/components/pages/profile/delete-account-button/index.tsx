import { useRef } from 'react'
import { Button } from '@nextui-org/react'

import { AlertDialog } from '@/ui/components/commons/alert-dialog'
import { AdminPasswordConfirmationDialog } from '@/ui/components/commons/admin-password-confirmation-dialog'
import type { DialogRef } from '@/ui/components/commons/dialog/types'
import { useDeleteButtonAccountButton } from './use-delete-account-button'

export const DeleteAccountButton = () => {
  const dialogRef = useRef<DialogRef>(null)
  const { handleDeleteConfirm, handleAdminPasswordConfirm } =
    useDeleteButtonAccountButton(dialogRef)

  return (
    <>
      <AdminPasswordConfirmationDialog
        ref={dialogRef}
        onConfirm={handleAdminPasswordConfirm}
      />

      <AlertDialog
        trigger={
          <Button type='button' size='md' color='danger'>
            Excluir conta
          </Button>
        }
        onConfirm={handleDeleteConfirm}
      >
        Tem certeza que deseja excluir sua conta? ESTA AÇÃO NÃO PODE SER DESFEITA!
      </AlertDialog>
    </>
  )
}
