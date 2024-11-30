'use client'

import { useState } from 'react'

import type {
  ExpirationDateNotification,
  StockLevelNotification,
} from '@stocker/core/entities'

import { useNotificationWebSocket } from '@/ui/hooks/use-notifications-websocket'
import { useAuthContext } from '@/ui/components/contexts/auth-context'

export function useNotificationDialog(companyId: string) {
  const { logout } = useAuthContext()
  const [stockLevelNotifications, setStockLevelNotifications] = useState<
    StockLevelNotification[]
  >([])
  const [expirationDateNotifications, setExpirationDateNotifications] = useState<
    ExpirationDateNotification[]
  >([])
  const [notificationsCount, setNotificationsCount] = useState(0)

  const { deleteNotification } = useNotificationWebSocket({
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
    onSendStockLevelNotification: (stockLevelNotification) => {
      setStockLevelNotifications((notifications) => [
        ...notifications,
        stockLevelNotification,
      ])
      setNotificationsCount((count) => count + 1)
    },
    onDeleteCompany: async () => await logout(),
  })

  function handleDeleteNotification(notificationId: string) {
    deleteNotification(notificationId)
  }

  return {
    notificationsCount,
    stockLevelNotifications,
    expirationDateNotifications,
    handleDeleteNotification,
  }
}
