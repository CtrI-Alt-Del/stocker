import WebSocket from 'ws'

import type { StockLevelNotification } from '@stocker/core/entities'
import { RealtimeResponse } from '@stocker/core/responses'
import { REALTIME_EVENTS } from '@stocker/core/constants'
import { ENV } from '@/constants'

export class NotificationsSocket {
  private readonly ws: WebSocket

  constructor(companyId: string) {
    this.ws = new WebSocket(`ws://${ENV.domain}:${ENV.port}/notifications/${companyId}`)
  }

  emitStockLevelNotification(notification: StockLevelNotification): void {
    const response = new RealtimeResponse({
      event: REALTIME_EVENTS.notificationsRoom.stockLevelNotificationSent,
      payload: notification.dto,
    })

    this.ws.send(response.message)
  }
}
