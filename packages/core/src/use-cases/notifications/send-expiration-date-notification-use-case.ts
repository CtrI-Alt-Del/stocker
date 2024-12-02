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
          batchDto: batch.dto,
        }),
      )

      notifications.push(...companyNotifications)
    }

    await this.notificationsRepository.addManyExpirationDateNotifications(notifications)
  }
}
