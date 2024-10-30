import { Notification } from '../abstracts'
import type { ExpirationDateNotificationDto } from '../../dtos'

type ExpirationDateNotificationProps = {
  companyId: string
  batch: {
    id: string
    code: string
  }
  createdAt: Date
}

export class ExpirationDateNotification extends Notification<ExpirationDateNotificationProps> {
  static create(dto: ExpirationDateNotificationDto) {
    return new ExpirationDateNotification(
      {
        companyId: dto.companyId,
        createdAt: dto.createdAt ?? new Date(),
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
      createdAt: this.props.createdAt,
    }
  }
}
