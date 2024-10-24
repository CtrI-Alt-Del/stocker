import { Notification } from '../abstracts'
import type { ExpirationDateNotificationDto } from '../../dtos'

type ExpirationDateNotificationProps = {
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
        createdAt: dto.createdAt,
        batch: dto.batch,
      },
      dto.id,
    )
  }

  get batch() {
    return this.props.batch
  }

  get dto(): ExpirationDateNotificationDto {
    return {
      id: this.id,
      batch: {
        id: this.props.batch.id,
        code: this.props.batch.code,
      },
      createdAt: this.props.createdAt,
    }
  }
}
