import type { ExpirationDateNotification } from '../../domain/entities/expiration-date-notification'
import type { StockLevelNotification } from '../../domain/entities/stock-level-notification'

export interface INotificationsRepository {
  findById(
    notificationId: string,
  ): Promise<StockLevelNotification | ExpirationDateNotification | null>
  findManyStockLevelNotificationsByCompany(
    companyId: string,
  ): Promise<StockLevelNotification[]>
  findManyExpirationDateNotificationsByCompany(
    companyId: string,
  ): Promise<ExpirationDateNotification[]>
  addStockLevelNotification(stockLevelNotification: StockLevelNotification): Promise<void>
  addManyExpirationDateNotifications(
    expirationDateNotifications: ExpirationDateNotification[],
  ): Promise<void>
  deleteNotification(notificationId: string): Promise<void>
}
