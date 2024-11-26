import { Notification } from '../abstracts'
import type { ExpirationDateNotificationDto } from '../../dtos'
import { Batch } from './batch'

type ExpirationDateNotificationProps = {
  companyId: string
  batch: Batch
  sentAt: Date
}

export class ExpirationDateNotification extends Notification<ExpirationDateNotificationProps> {
  static create(dto: ExpirationDateNotificationDto) {
    return new ExpirationDateNotification(
      {
        companyId: dto.companyId,
        sentAt: dto.sentAt ?? new Date(),
        batch: Batch.create(dto.batchDto),
      },
      dto.id,
    )
  }

  get companyId() {
    return this.props.companyId
  }

  get batch() {
    return this.props.batch
  }

  get dto(): ExpirationDateNotificationDto {
    return {
      id: this.id,
      companyId: this.props.companyId,
      batchDto: this.batch.dto,
      sentAt: this.props.sentAt,
    }
  }
}
