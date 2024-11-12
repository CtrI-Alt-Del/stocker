import type { IApiClient, INotificationsService } from '@stocker/core/interfaces'
import type {
  StockLevelNotificationDto,
  ExpirationDateNotificationDto,
} from '@stocker/core/dtos'

export const NotificationsService = (apiClient: IApiClient): INotificationsService => {
  return {
    async listNotifications(companyId: string) {
      return await apiClient.get<{
        stockNotifications: StockLevelNotificationDto[]
        expirationDateNotifications: ExpirationDateNotificationDto[]
        notificationsCount: number
      }>(`/notifications?companyId=${companyId}`)
    },

    async deleteNotification() {
      return await apiClient.delete('/notifications')
    },
  }
}
