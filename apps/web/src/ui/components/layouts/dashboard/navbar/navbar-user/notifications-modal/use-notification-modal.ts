import { CACHE } from '@/constants'
import { useAuthContext } from '@/ui/components/contexts/auth-context'
import { useApi, useCache, useToast } from '@/ui/hooks'

export function useNotificationModal() {
  const { notificationService } = useApi()
  const { user } = useAuthContext()
  const { showError } = useToast()
  async function fetchNotifications() {
    const response = await notificationService.listNotifications(
      user?.email || '',
      user?.password || '',
    )
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    return response.body
  }
  const { data, refetch } = useCache({
    fetcher: fetchNotifications,
    dependencies: [user?.email],
    key: CACHE.notifications.key,
  })
  const stockNotifications = data ? data.stockNotifications : []
  const expirationDateNotifications = data ? data.expirationDateNotifications : []
  const totalNotifications = data
    ? data.expirationDateNotifications.length + data.stockNotifications.length
    : 0

  return {
    totalNotifications,
    stockNotifications,
    expirationDateNotifications,
  }
}
