import type { BatchDto } from '../../dtos'
import { Entity } from '../abstracts'

type BatchProps = {
  code: string
  itemsCount: number
  productId: string
  expirationDate: Date | null
  maximumDaysToExpiration: number | null
  hasUpdatedStock: boolean
  registeredAt: Date
}

export class Batch extends Entity<BatchProps> {
  static create(dto: BatchDto) {
    return new Batch(
      {
        code: dto.code,
        expirationDate: dto.expirationDate ? new Date(dto.expirationDate) : null,
        maximumDaysToExpiration: dto.maximumDaysToExpiration ?? null,
        itemsCount: dto.itemsCount,
        productId: dto.productId,
        hasUpdatedStock: false,
        registeredAt: dto.registeredAt ?? new Date(),
      },
      dto.id,
    )
  }

  reduceItemsCount(itemsCount: number): void {
    this.props.itemsCount -= itemsCount

    if (this.props.itemsCount) this.props.hasUpdatedStock = true
  }

  update(dto: Partial<BatchDto>) {
    return Batch.create({ ...this.dto, ...dto })
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

  get expirationDate(): Date | null {
    return this.props.expirationDate
  }

  get maximumDaysToExpiration(): number | null {
    return this.props.maximumDaysToExpiration
  }

  get registeredAt(): Date {
    return this.props.registeredAt
  }

  get dto(): BatchDto {
    const dto: BatchDto = {
      id: this.id,
      code: this.props.code,
      itemsCount: this.itemsCount,
      productId: this.props.productId,
      registeredAt: this.props.registeredAt,
    }

    if (this.expirationDate) dto.expirationDate = this.expirationDate

    if (this.maximumDaysToExpiration)
      dto.maximumDaysToExpiration = this.maximumDaysToExpiration

    return dto
  }
}
