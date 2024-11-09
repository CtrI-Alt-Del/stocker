import { REALTIME_EVENTS } from '@stocker/core/constants'
import { useWebSocket } from './use-websocket'
import {
  ExpirationDateNotification,
  StockLevelNotification,
} from '@stocker/core/entities'
import { BROWSER_ENV } from '@/constants'
import { useEffect } from 'react'

type Notifications = {
  stockLevelNotifications: StockLevelNotification[]
  expirationDateNotifications: ExpirationDateNotification[]
  notificationsCount: number
}

type UseNotificationWebSocketProps = {
  companyId: string
  onConnect: (notifications: Notifications) => void
}

export function useNotificationWebSocket({
  companyId,
  onConnect,
}: UseNotificationWebSocketProps) {
  const { isOpen, sendResponse } = useWebSocket({
    url: `${BROWSER_ENV.serverRealtimeUrl}/notifications/${companyId}`,
    onResponse(response) {
      switch (response.event) {
        case REALTIME_EVENTS.notificationsChannel.connected:
          console.log(response.payload)
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
      }
    },
    onError() {
      alert(`${BROWSER_ENV.serverRealtimeUrl}/notifications/${companyId}`)
    },
  })

  useEffect(() => {
    if (isOpen) sendResponse(REALTIME_EVENTS.notificationsChannel.connected)
  }, [isOpen, sendResponse])

  return {}
}
