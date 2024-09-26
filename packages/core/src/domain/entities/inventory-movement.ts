import type { InventoryMovementDto } from '../../dtos'
import { ValidationError } from '../../errors'
import type { InventoryMovementType } from '../../types'
import { Entity } from '../abstracts'

type MovementProps = {
  movementType: InventoryMovementType
  itemsCount: number
  registeredAt: Date
  remark: string | null
  product: {
    id: string
    name?: string
  }
  responsible: {
    id: string
    name?: string
  }
}

export class InventoryMovement extends Entity<MovementProps> {
  static create(dto: InventoryMovementDto): InventoryMovement {
    const movementType = dto.movementType

    if (!InventoryMovement.isMovementType(movementType)) {
      throw new ValidationError(`${movementType} não é um tipo de movimento válido`)
    }

    return new InventoryMovement(
      {
        movementType,
        itemsCount: dto.itemsCount,
        registeredAt: dto.registeredAt,
        remark: dto.remark ?? null,
        product: dto.product,
        responsible: dto.responsible,
      },
      dto.id,
    )
  }

  static isMovementType(movementType: string): movementType is InventoryMovementType {
    return ['inbound', 'outbound'].includes(movementType)
  }

  get dto(): InventoryMovementDto {
    const dto: InventoryMovementDto = {
      id: this.id,
      movementType: this.props.movementType,
      itemsCount: this.props.itemsCount,
      responsible: this.props.responsible,
      product: this.props.product,
      registeredAt: this.props.registeredAt,
      remark: this.props.remark ?? undefined,
    }

    if (this.props.remark) dto.remark = this.props.remark

    return dto
  }

  get movementType(): InventoryMovementType {
    return this.props.movementType
  }

  get itemsCount(): number {
    return this.props.itemsCount
  }

  get responsible() {
    return this.props.responsible
  }

  get product() {
    return this.props.product
  }

  get registeredAt(): Date {
    return this.props.registeredAt
  }

  get remark(): string | null {
    return this.props.remark
  }
}
