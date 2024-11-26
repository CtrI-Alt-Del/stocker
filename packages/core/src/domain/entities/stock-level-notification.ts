import { Notification } from '../abstracts'
import type { StockLevelNotificationDto } from '../../dtos'
import { Product } from './product'

type StockLevelNotificationProps = {
  companyId: string
  product: Product
  sentAt: Date
}

export class StockLevelNotification extends Notification<StockLevelNotificationProps> {
  static create(dto: StockLevelNotificationDto) {
    return new StockLevelNotification(
      {
        companyId: dto.companyId,
        product: Product.create(dto.productDto),
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
      id: this.id,
      companyId: this.props.companyId,
      productDto: this.product.dto,
      sentAt: this.props.sentAt,
    }
  }
}
