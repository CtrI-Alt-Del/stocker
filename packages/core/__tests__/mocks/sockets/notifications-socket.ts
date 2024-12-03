import type { StockLevelNotification } from '../../../src/domain/entities'
import type { INotificationsSocket } from '../../../src/interfaces'

export class NotificationsSocketMock implements INotificationsSocket {
  emittedStockLevelNotifications: StockLevelNotification[] = []
  emittedCompanyDeletedNotificationsCount =  0

  emitStockLevelNotification(notification: StockLevelNotification): void {
    this.emittedStockLevelNotifications.push(notification)
  }

  emitCompanyDeletedNotification(): void {
    this.emittedCompanyDeletedNotificationsCount += 1
  }
}
