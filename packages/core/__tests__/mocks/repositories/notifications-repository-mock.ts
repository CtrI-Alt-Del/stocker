import {
  ExpirationDateNotification,
  StockLevelNotification,
} from '../../../src/domain/entities'
import type { INotificationsRepository } from '../../../src/interfaces'

export class NotificationsRepositoryMock implements INotificationsRepository {
  stockLevelNotifications: StockLevelNotification[] = []
  expirationDateNotifications: ExpirationDateNotification[] = []

  async findById(
    notificationId: string,
  ): Promise<StockLevelNotification | ExpirationDateNotification | null> {
    const notification = this.stockLevelNotifications.find(
      (notification) => notification.id === notificationId,
    )

    if (!notification) {
      const notification = this.expirationDateNotifications.find(
        (notification) => notification.id === notificationId,
      )

      return notification ?? null
    }

    return notification
  }

  async findManyStockLevelNotificationsByCompany(
    companyId: string,
  ): Promise<StockLevelNotification[]> {
    return this.stockLevelNotifications.filter(
      (notification): notification is StockLevelNotification =>
        notification instanceof StockLevelNotification &&
        notification.companyId === companyId,
    )
  }

  async findManyExpirationDateNotificationsByCompany(
    companyId: string,
  ): Promise<ExpirationDateNotification[]> {
    return this.expirationDateNotifications.filter(
      (notification): notification is ExpirationDateNotification =>
        notification instanceof ExpirationDateNotification &&
        notification.companyId === companyId,
    )
  }

  async addStockLevelNotification(
    stockLevelNotification: StockLevelNotification,
  ): Promise<void> {
    this.stockLevelNotifications.push(stockLevelNotification)
  }

  async addManyExpirationDateNotifications(
    expirationNotifications: ExpirationDateNotification[],
  ): Promise<void> {
    this.expirationDateNotifications.push(...expirationNotifications)
  }

  async deleteNotification(notificationId: string): Promise<void> {
    const oldStockNotificationsCount = this.stockLevelNotifications.length

    this.stockLevelNotifications = this.stockLevelNotifications.filter(
      (notification) => notification.id !== notificationId,
    )

    if (this.stockLevelNotifications.length === oldStockNotificationsCount) {
      this.expirationDateNotifications = this.expirationDateNotifications.filter(
        (notification) => notification.id !== notificationId,
      )
    }
  }

  async findStockLevelNotificationByProduct(
    productId: string,
  ): Promise<StockLevelNotification | null> {
    return (
      this.stockLevelNotifications.find(
        (notification) => notification.product.id === productId,
      ) ?? null
    )
  }
}
