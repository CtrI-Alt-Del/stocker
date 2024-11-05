import { NotFoundError } from '../../errors'
import type { INotificationsRepository } from '../../interfaces'

type Request = {
  notificationId: string
}

export class DeleteNotificationUseCase {
  constructor(private readonly notificationsRepository: INotificationsRepository) {}

  async execute({ notificationId }: Request): Promise<void> {
    const notification = await this.notificationsRepository.findById(notificationId)
    if (!notification) {
      throw new NotFoundError('Notificação não encontrada')
    }

    await this.notificationsRepository.deleteNotification(notificationId)
  }
}
