import type { ExpirationDateNotificationDto, StockLevelNotificationDto } from '../../dtos'
import type { ApiResponse } from '../../responses'

export interface INotificationsService {
  listNotifications(companyId: string): Promise<
    ApiResponse<{
      stockNotifications: StockLevelNotificationDto[]
      expirationDateNotifications: ExpirationDateNotificationDto[]
      notificationsCount: number
    }>
  >
  deleteNotification(notificationId: string): Promise<ApiResponse>
}
