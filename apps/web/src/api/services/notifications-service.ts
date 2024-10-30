import type { IApiClient, INotificationsService } from '@stocker/core/interfaces'
import type {
  StockLevelNotificationDto,
  ExpirationDateNotificationDto,
} from '@stocker/core/dtos'

export const NotificationsService = (apiClient: IApiClient): INotificationsService => {
  return {
    async listNotifications() {
      return await apiClient.get<{
        stockNotifications: StockLevelNotificationDto[]
        expirationDateNotifications: ExpirationDateNotificationDto[]
      }>('/notifications')
    },

    async deleteNotification() {
      return await apiClient.delete('/notifications')
    },
  }
}
