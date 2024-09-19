import type { BatchDto } from '../../dtos'
import { Entity } from '../abstracts'

type BatchProps = {
  code: string
  expirationDate: Date
  itemsCount: number
  productId: string
  hasUpdatedStock: boolean
}

export class Batch extends Entity<BatchProps> {
  static create(dto: BatchDto) {
    return new Batch(
      {
        code: dto.code,
        expirationDate: dto.expirationDate,
        itemsCount: dto.itemsCount,
        productId: dto.productId,
        hasUpdatedStock: false,
      },
      dto.id,
    )
  }

  reduceItemsCount(itemsCount: number): void {
    this.props.itemsCount -= itemsCount
    if (this.props.itemsCount) this.props.hasUpdatedStock = true
  }

  get hasItems(): boolean {
    return this.itemsCount > 0
  }

  get hasUpdatedStock(): boolean {
    return this.props.hasUpdatedStock
  }

  get code(): string {
    return this.props.code
  }

  get itemsCount(): number {
    return this.props.itemsCount
  }

  get expirationDate(): Date {
    return this.props.expirationDate
  }

  get dto(): BatchDto {
    return {
      id: this.id,
      code: this.props.code,
      expirationDate: this.props.expirationDate,
      itemsCount: this.itemsCount,
      productId: this.props.productId,
    }
  }
}
