import { useAuthContext } from '@/ui/components/contexts/auth-context'

export function useDeleteButtonAccountButton() {
  const { deleteAccount } = useAuthContext()

  async function handleAdminPasswordConfirm(isAuthenticated: boolean) {
    if (isAuthenticated) await deleteAccount()
  }

  return {
    handleAdminPasswordConfirm,
  }
}
