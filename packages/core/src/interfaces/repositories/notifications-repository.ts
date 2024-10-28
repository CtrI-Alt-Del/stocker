import type { ExpirationDateNotification } from '../../domain/entities/expiration-date-notification'
import type { StockLevelNotification } from '../../domain/entities/stock-level-notification'

export interface INotificationsRepository {
  findById(notificationId: string): Promise<StockLevelNotification | ExpirationDateNotification | null>
  findManyStockLevelNotifications(companyId: string): Promise<StockLevelNotification[]>
  findManyExpirationDateNotifications(companyId: string): Promise<ExpirationDateNotification[]>
  addStockLevelNotification(stockLevelNotification: StockLevelNotification): Promise<void>
  addExpirationDateNotification(
    expirationNotification: ExpirationDateNotification,
  ): Promise<void>
  deleteNotification(notificationId: string): Promise<void>
}
