import { ExpirationDateNotification } from '@stocker/core/entities'
import type { PrismaExpirationDateNotification } from '../types'

export class PrismaExpirationDateNotificationMapper {
  toDomain(
    prismaExpirationDateNotification: PrismaExpirationDateNotification,
  ): ExpirationDateNotification {
    return ExpirationDateNotification.create({
      id: prismaExpirationDateNotification.id,
      batch: {
        id: prismaExpirationDateNotification.batch_id,
        code: prismaExpirationDateNotification.Batch.code,
      },
      createdAt: prismaExpirationDateNotification.registered_at,
      companyId: prismaExpirationDateNotification.company_id,
    })
  }

  toPrisma(
    expirationDateNotification: ExpirationDateNotification,
  ): PrismaExpirationDateNotification {
    return {
      id: expirationDateNotification.id,
      registered_at: expirationDateNotification.createdAt,
      batch_id: expirationDateNotification.batch.id,
      Batch: {
        id: expirationDateNotification.batch.id,
        code: expirationDateNotification.batch.code,
      },
      company_id: expirationDateNotification.companyId,
    }
  }
}
