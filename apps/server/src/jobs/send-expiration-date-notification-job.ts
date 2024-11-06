import { SendExpirationDateNotificationsUseCase } from '@stocker/core/use-cases'

import { batchesRepository, notificationsRepository } from '@/database'

export class SendExpirationDateNotificationJob {
  async handle() {
    const useCase = new SendExpirationDateNotificationsUseCase(
      notificationsRepository,
      batchesRepository,
    )
    await useCase.execute()
  }
}
