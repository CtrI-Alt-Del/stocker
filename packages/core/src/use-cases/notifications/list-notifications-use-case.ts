import type { INotificationsRepository } from '../../interfaces'

type Request = {
  companyId: string
}

export class ListNotificationsUseCase {
  constructor(private readonly notificationsRepository: INotificationsRepository) {}

  async execute({ companyId }: Request) {
    const stockNotifications =
      await this.notificationsRepository.findManyStockLevelNotificationsByCompany(
        companyId,
      )
    const expirationDateNotifications =
      await this.notificationsRepository.findManyExpirationDateNotificationsByCompany(
        companyId,
      )

    return {
      stockLevelNotifications: stockNotifications.map((notification) => notification.dto),
      expirationDateNotifications: expirationDateNotifications.map(
        (notification) => notification.dto,
      ),
      notificationsCount: stockNotifications.length + expirationDateNotifications.length,
    }
  }
}
