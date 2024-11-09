'use client'

import { useState } from 'react'
import { useNotificationWebSocket } from '@/ui/hooks/use-notifications-websocket'
import type {
  ExpirationDateNotification,
  StockLevelNotification,
} from '@stocker/core/entities'

export function useNotificationDialog(companyId: string) {
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
    onSendStockLevelNotification(stockLevelNotification) {
      setStockLevelNotifications((notifications) => [
        ...notifications,
        stockLevelNotification,
      ])
      setNotificationsCount((count) => count + 1)
    },
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
