import type { IJob } from '@stocker/core/interfaces'
import type { JobKey } from '@stocker/core/types'
import { SendStockLevelNotificationsUseCase } from '@stocker/core/use-cases'

import { notificationsRepository, productsRepository } from '@/database'

type Payload = {
  productId: string
}

export class SendStockLevelNotificationJob implements IJob {
  readonly key: JobKey = 'send-stock-level-notification'

  async handle({ productId }: Payload) {
    const useCase = new SendStockLevelNotificationsUseCase(
      notificationsRepository,
      productsRepository,
    )

    await useCase.execute(productId)
  }
}
