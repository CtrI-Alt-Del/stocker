import type { RefObject } from 'react'

import type { DialogRef } from '@/ui/components/commons/dialog/types'
import { useAuthContext } from '@/ui/components/contexts/auth-context'

export function useDeleteButtonAccountButton(dialogRef: RefObject<DialogRef>) {
  const { deleteAccount } = useAuthContext()

  function handleDeleteConfirm() {
    dialogRef.current?.open()
  }

  async function handleAdminPasswordConfirm(isAuthenticated: boolean) {
    if (isAuthenticated) await deleteAccount()
  }

  return {
    handleAdminPasswordConfirm,
    handleDeleteConfirm,
  }
}
