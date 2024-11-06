import { useAuthContext } from '@/ui/components/contexts/auth-context'

export function useDeleteAdminAccount(userId: string) {
  const { deleteUser } = useAuthContext()

  async function handleDeleteAdminAccountButtonClick() {
    await deleteUser(userId)
  }

  return {
    handleDeleteAdminAccountButtonClick,
  }
}
