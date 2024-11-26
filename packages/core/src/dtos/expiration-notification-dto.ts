import type { BatchDto } from './batch-dto'

export type ExpirationDateNotificationDto = {
  id?: string
  companyId: string
  batchDto: BatchDto
  registeredAt?: Date
  sentAt?: Date
}
