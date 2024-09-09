import type { BatchDto } from '../../dtos'
import { Entity } from '../abstracts'

type BatchProps = {
  code: string
  expirationDate: Date
  itemsQuantity: number
}

export class Batch extends Entity<BatchProps> {
  static create(dto: BatchDto) {
    return new Batch({
      code: dto.code,
      expirationDate: dto.expirationDate,
      itemsQuantity: dto.itemsQuantity,
    })
  }

  get code(): string {
    return this.props.code
  }

  get itemsQuantity(): number {
    return this.props.itemsQuantity
  }

  get expirationDate(): Date {
    return this.props.expirationDate
  }

  get dto(): BatchDto {
    return {
      code: this.props.code,
      expirationDate: this.props.expirationDate,
      itemsQuantity: this.itemsQuantity,
    }
  }
}
