import { useAuthContext } from '@/ui/components/contexts/auth-context'

export function useUserMenu() {
  const { logout } = useAuthContext()

  async function handleLogoutButtonClick() {
    await logout()
  }

  return {
    handleLogoutButtonClick,
  }
}
