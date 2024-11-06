import type { ExpirationDateNotification } from '@prisma/client'

export type PrismaExpirationDateNotification = ExpirationDateNotification & {
  company_id: string
  Batch: {
    id: string
    code: string
  }
}
