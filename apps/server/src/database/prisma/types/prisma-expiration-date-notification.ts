import type { ExpirationDateNotification } from '@prisma/client'
import type { PrismaBatch } from './prisma-batch'

export type PrismaExpirationDateNotification = ExpirationDateNotification & {
  company_id: string
  batch: PrismaBatch
}
