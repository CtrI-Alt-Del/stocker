import { Button } from '@nextui-org/react'

import { AlertDialog } from '@/ui/components/commons/alert-dialog'
import { useAuthContext } from '@/ui/components/contexts/auth-context'

export const DeleteAccount = () => {
  const { deleteAccount } = useAuthContext()

  return (
    <AlertDialog
      trigger={
        <Button size='md' color='danger'>
          Excluir conta
        </Button>
      }
      onConfirm={async () => await deleteAccount()}
    >
      Tem certeza que deseja excluir sua conta? ESTA AÇÃO NÃO PODE SER DESFEITA!
    </AlertDialog>
  )
}
