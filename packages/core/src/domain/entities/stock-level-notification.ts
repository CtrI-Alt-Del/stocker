import { Notification } from '../abstracts'
import type { StockLevelNotificationDto } from '../../dtos'

type StockLevelNotificationProps = {
  companyId: string
  product: {
    id: string
    name: string
    code: string
  }
  createdAt: Date
}

export class StockLevelNotification extends Notification<StockLevelNotificationProps> {
  static create(dto: StockLevelNotificationDto) {
    return new StockLevelNotification(
      {
        companyId: dto.companyId,
        createdAt: dto.createdAt,
        product: dto.product,
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

  get createdAt() {
    return this.props.createdAt
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
      createdAt: this.props.createdAt,
    }
  }
}
