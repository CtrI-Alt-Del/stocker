import type { StockLevelNotification } from '../../domain/entities'

export interface INotificationsSocket {
  emitStockLevelNotification(notification: StockLevelNotification): void
}
