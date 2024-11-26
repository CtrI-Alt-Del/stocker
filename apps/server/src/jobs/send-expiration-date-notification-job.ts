import { SendExpirationDateNotificationsUseCase } from '@stocker/core/use-cases'
import type { IJob } from '@stocker/core/interfaces'
import type { JobKey } from '@stocker/core/types'
import { batchesRepository, notificationsRepository } from '@/database'

export class SendExpirationDateNotificationJob implements IJob {
  readonly key: JobKey = 'send-expiration-date-notification'

  async handle() {
    const useCase = new SendExpirationDateNotificationsUseCase(
      notificationsRepository,
      batchesRepository,
    )
    await useCase.execute()
  }
}
