import {
  ExpirationDateNotification,
  StockLevelNotification,
} from '../../../src/domain/entities'
import type { INotificationsRepository } from '../../../src/interfaces'

export class NotificationsRepositoryMock implements INotificationsRepository {
  private notifications: (ExpirationDateNotification | StockLevelNotification)[] = []

  async findById(
    notificationId: string,
  ): Promise<StockLevelNotification | ExpirationDateNotification | null> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId,
    )
    return notification ?? null
  }

  async findManyStockLevelNotifications(
    companyId: string,
  ): Promise<StockLevelNotification[]> {
    return this.notifications.filter(
      (notification): notification is StockLevelNotification =>
        notification instanceof StockLevelNotification &&
        notification.companyId === companyId,
    )
  }

  async findManyExpirationDateNotifications(
    companyId: string,
  ): Promise<ExpirationDateNotification[]> {
    return this.notifications.filter(
      (notification): notification is ExpirationDateNotification =>
        notification instanceof ExpirationDateNotification &&
        notification.companyId === companyId,
    )
  }

  async addStockLevelNotification(
    stockLevelNotification: StockLevelNotification,
  ): Promise<void> {
    this.notifications.push(stockLevelNotification)
  }

  async addManyExpirationDateNotifications(
    expirationNotifications: ExpirationDateNotification[],
  ): Promise<void> {
    this.notifications.push(...expirationNotifications)
  }

  async deleteNotification(notificationId: string): Promise<void> {
    this.notifications = this.notifications.filter(
      (notification) => notification.id !== notificationId,
    )
  }
}
