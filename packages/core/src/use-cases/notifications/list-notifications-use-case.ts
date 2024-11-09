import type { INotificationsRepository } from '../../interfaces'
import type { StockLevelNotificationDto, ExpirationDateNotificationDto } from '../../dtos'

type Request = {
  companyId: string
}

type Response = {
  stockNotifications: StockLevelNotificationDto[]
  expirationDateNotifications: ExpirationDateNotificationDto[]
}

export class ListNotificationsUseCase {
  constructor(private readonly notificationsRepository: INotificationsRepository) {}

  async execute({ companyId }: Request): Promise<Response> {
    const stockNotifications =
      await this.notificationsRepository.findManyStockLevelNotificationsByCompany(
        companyId,
      )
    const expirationDateNotifications =
      await this.notificationsRepository.findManyExpirationDateNotificationsByCompany(
        companyId,
      )

    return {
      stockNotifications: stockNotifications.map((notification) => notification.dto),
      expirationDateNotifications: expirationDateNotifications.map(
        (notification) => notification.dto,
      ),
    }
  }
}
