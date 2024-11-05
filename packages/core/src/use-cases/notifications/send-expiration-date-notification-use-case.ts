import type { IBatchesRepository } from '../../interfaces'
import type { INotificationsRepository } from '../../interfaces'
import { ExpirationDateNotification } from '../../domain/entities'
import { NotFoundError } from '../../errors'

export class SendExpirationDateNotificationsUseCase {
  constructor(
    private readonly notificationsRepository: INotificationsRepository,
    private readonly batchesRepository: IBatchesRepository,
  ) {}

  async execute(): Promise<void> {
    try {
      const nearExpiringBatches = await this.batchesRepository.findManyNearToExpire()

      if (nearExpiringBatches.length === 0) {
        throw new NotFoundError('Nenhum lote próximo da expiração encontrado')
      }

      const notifications = nearExpiringBatches.map(({ batches, companyId }) =>
        ExpirationDateNotification.create({
          companyId,
          batch: batches,
        }),
      )
      await this.notificationsRepository.addManyExpirationDateNotification(notifications)
    } catch (error) {
      throw new NotFoundError('Erro ao enviar notificações de expiração')
    }
  }
}
