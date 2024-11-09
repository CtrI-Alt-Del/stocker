import { useToast } from '@/ui/hooks'
import { useNotificationWebSocket } from '@/ui/hooks/use-notifications-websocket'
import type {
  ExpirationDateNotification,
  StockLevelNotification,
} from '@stocker/core/entities'
import { useCallback, useState } from 'react'

export function useNotificationDialog(companyId: string) {
  const { showError } = useToast()
  const [stockLevelNotifications, setStockLevelNotifications] = useState<
    StockLevelNotification[]
  >([])
  const [expirationDateNotifications, setExpirationDateNotifications] = useState<
    ExpirationDateNotification[]
  >([])
  const [notificationsCount, setNotificationsCount] = useState(0)

  useNotificationWebSocket({
    companyId,
    onConnect: ({
      expirationDateNotifications,
      stockLevelNotifications,
      notificationsCount,
    }) => {
      setExpirationDateNotifications(expirationDateNotifications)
      setStockLevelNotifications(stockLevelNotifications)
      setNotificationsCount(notificationsCount)
    },
  })

  return {
    notificationsCount,
    stockLevelNotifications,
    expirationDateNotifications,
  }
}
