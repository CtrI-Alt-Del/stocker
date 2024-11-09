import type { IJob } from '@stocker/core/interfaces'
import type { JobKey } from '@stocker/core/types'
import { SendStockLevelNotificationsUseCase } from '@stocker/core/use-cases'

import { notificationsRepository, productsRepository } from '@/database'
import { NotificationsSocket } from '@/realtime/sockets'

type Payload = {
  productId: string
  companyId: string
}

export class SendStockLevelNotificationJob implements IJob {
  readonly key: JobKey = 'send-stock-level-notification'

  async handle({ productId, companyId }: Payload) {
    const notificationSocket = new NotificationsSocket(companyId)
    const useCase = new SendStockLevelNotificationsUseCase(
      notificationsRepository,
      productsRepository,
      notificationSocket,
    )
    await useCase.execute(productId)
  }
}
