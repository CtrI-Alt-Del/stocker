import { SendExpirationDateNotificationsUseCase } from '@stocker/core/use-cases'
import type {
  IBatchesRepository,
  INotificationsRepository,
} from '@stocker/core/interfaces'

export class SendExpirationDateNotificationJob {
  constructor(
    private readonly notificationsRepository: INotificationsRepository,
    private readonly batchesRepository: IBatchesRepository,
  ) {}

  async handle() {
    const useCase = new SendExpirationDateNotificationsUseCase(
      this.notificationsRepository,
      this.batchesRepository,
    )
    await useCase.execute()
  }
}
