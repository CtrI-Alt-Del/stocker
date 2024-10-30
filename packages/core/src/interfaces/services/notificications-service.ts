import type { ExpirationDateNotificationDto, StockLevelNotificationDto } from '../../dtos'
import type { ApiResponse } from '../../responses'

export interface INotificationsService {
  listNotifications(
    email: string,
    password: string,
  ): Promise<
    ApiResponse<{
      stockNotifications: StockLevelNotificationDto[]
      expirationDateNotifications: ExpirationDateNotificationDto[]
    }>
  >
  deleteNotification(notificationId: string): Promise<ApiResponse>
}
