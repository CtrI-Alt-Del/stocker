import { ExpirationDateNotification } from '@stocker/core/entities'
import type { PrismaExpirationDateNotification } from '../types'
import { PrismaBatchesMapper } from './prisma-batches-mapper'

export class PrismaExpirationDateNotificationMapper {
  toDomain(
    prismaExpirationDateNotification: PrismaExpirationDateNotification,
  ): ExpirationDateNotification {
    const batchMapper = new PrismaBatchesMapper()

    return ExpirationDateNotification.create({
      id: prismaExpirationDateNotification.id,
      batchDto: batchMapper.toDomain(prismaExpirationDateNotification.batch).dto,
      sentAt: prismaExpirationDateNotification.registered_at,
      companyId: prismaExpirationDateNotification.company_id,
    })
  }

  toPrisma(
    expirationDateNotification: ExpirationDateNotification,
  ): PrismaExpirationDateNotification {
    const batchMapper = new PrismaBatchesMapper()

    return {
      id: expirationDateNotification.id,
      registered_at: expirationDateNotification.sentAt,
      batch_id: expirationDateNotification.batch.id,
      batch: batchMapper.toPrisma(expirationDateNotification.batch),
      company_id: expirationDateNotification.companyId,
    }
  }
}
