import { SendExpirationDateNotificationsUseCase } from '@stocker/core/use-cases'
import type {
  IBatchesRepository,
  IJob,
  INotificationsRepository,
} from '@stocker/core/interfaces'
import type { JobKey } from '@stocker/core/types'

export class SendExpirationDateNotificationJob implements IJob {
  readonly key: JobKey = 'send-expiration-date-notification'

  constructor(
    private readonly notificationsRepository: INotificationsRepository,
    private readonly batchesRepository: IBatchesRepository,
  ) {}

  async handle() {
    const useCase = new SendExpirationDateNotificationsUseCase(
      notificationsRepository,
      batchesRepository,
    )
    await useCase.execute()
  }
}
