import type { IBatchesRepository } from '../../interfaces'
import type { INotificationsRepository } from '../../interfaces'
import { ExpirationDateNotification } from '../../domain/entities'

export class SendExpirationDateNotificationsUseCase {
  constructor(
    private readonly notificationsRepository: INotificationsRepository,
    private readonly batchesRepository: IBatchesRepository,
  ) {}

  async execute(): Promise<void> {
    const companyNearExpiringBatches = await this.batchesRepository.findManyNearToExpire()

    const notifications: ExpirationDateNotification[] = []

    for (const { companyId, batches } of companyNearExpiringBatches) {
      const companyNotifications = batches.map((batch) =>
        ExpirationDateNotification.create({
          companyId,
          batch: { id: batch.id, code: batch.code },
        }),
      )

      notifications.push(...companyNotifications)
    }

    console.log(notifications.length)

    // await this.notificationsRepository.addManyExpirationDateNotifications(notifications)
  }
}
