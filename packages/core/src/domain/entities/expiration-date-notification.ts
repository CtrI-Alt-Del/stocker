import { Notification } from '../abstracts'
import type { ExpirationDateNotificationDto } from '../../dtos'

type ExpirationDateNotificationProps = {
  companyId: string
  batch: {
    id: string
    code: string
  }
  sentAt: Date
}

export class ExpirationDateNotification extends Notification<ExpirationDateNotificationProps> {
  static create(dto: ExpirationDateNotificationDto) {
    return new ExpirationDateNotification(
      {
        companyId: dto.companyId,
        sentAt: dto.sentAt ?? new Date(),
        batch: dto.batch,
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
      batch: {
        id: this.props.batch.id,
        code: this.props.batch.code,
      },
      sentAt: this.props.sentAt,
    }
  }
}
