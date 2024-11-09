import { useCallback, useEffect } from 'react'

import { REALTIME_EVENTS } from '@stocker/core/constants'
import type { StockLevelNotificationDto } from '@stocker/core/dtos'
import {
  ExpirationDateNotification,
  StockLevelNotification,
} from '@stocker/core/entities'

import { BROWSER_ENV } from '@/constants'
import { useWebSocket } from './use-websocket'

import { useToast } from './use-toast'

type Notifications = {
  stockLevelNotifications: StockLevelNotification[]
  expirationDateNotifications: ExpirationDateNotification[]
  notificationsCount: number
}

type UseNotificationWebSocketProps = {
  companyId: string
  onConnect: (notifications: Notifications) => void
  onSendStockLevelNotification: (stockLevelNotification: StockLevelNotification) => void
}

export function useNotificationWebSocket({
  companyId,
  onConnect,
  onSendStockLevelNotification,
}: UseNotificationWebSocketProps) {
  const { showError } = useToast()

  const { isOpen, sendResponse } = useWebSocket({
    url: `${BROWSER_ENV.serverRealtimeUrl}/notifications/${companyId}`,
    onResponse(response) {
      switch (response.event) {
        case REALTIME_EVENTS.notificationsChannel.connected:
          onConnect({
            stockLevelNotifications: response.payload.stockLevelNotifications.map(
              StockLevelNotification.create,
            ),
            expirationDateNotifications: response.payload.expirationDateNotifications.map(
              ExpirationDateNotification.create,
            ),
            notificationsCount: response.payload.notificationsCount,
          })
          break
        case REALTIME_EVENTS.notificationsChannel.stockLevelNotificationSent:
          onSendStockLevelNotification(StockLevelNotification.create(response.payload))
          break
      }
    },
    onError() {
      showError('Não possível se conectar com sistema de notificações')
    },
  })

  const deleteNotification = useCallback(
    (notificationId: string) => {
      sendResponse(
        REALTIME_EVENTS.notificationsChannel.notificationDeleted,
        notificationId,
      )
    },
    [sendResponse],
  )

  useEffect(() => {
    if (isOpen) sendResponse(REALTIME_EVENTS.notificationsChannel.connected)
  }, [isOpen, sendResponse])

  return {
    deleteNotification,
  }
}
