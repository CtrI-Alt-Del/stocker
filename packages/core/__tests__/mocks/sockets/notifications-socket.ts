import type { StockLevelNotification } from '../../../src/domain/entities'
import type { INotificationsSocket } from '../../../src/interfaces'

export class NotificationsSocketMock implements INotificationsSocket {
  emittedStockLevelNotifications: StockLevelNotification[] = []

  emitStockLevelNotification(notification: StockLevelNotification): void {
    this.emittedStockLevelNotifications.push(notification)
  }
}
