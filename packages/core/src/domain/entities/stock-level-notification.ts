import { Notification } from '../abstracts'
import type { StockLevelNotificationDto } from '../../dtos'

type StockLevelNotificationProps = {
  companyId: string
  product: {
    id: string
    name: string
    code: string
  }
  sentAt: Date
}

export class StockLevelNotification extends Notification<StockLevelNotificationProps> {
  static create(dto: StockLevelNotificationDto) {
    return new StockLevelNotification(
      {
        companyId: dto.companyId,
        product: dto.product,
        sentAt: dto.sentAt ?? new Date(),
      },
      dto.id,
    )
  }

  get companyId() {
    return this.props.companyId
  }

  get product() {
    return this.props.product
  }

  get sentAt() {
    return this.props.sentAt
  }

  get dto(): StockLevelNotificationDto {
    return {
      companyId: this.props.companyId,
      id: this.id,
      product: {
        id: this.props.product.id,
        name: this.props.product.name,
        code: this.props.product.code,
      },
      sentAt: this.props.sentAt,
    }
  }
}
