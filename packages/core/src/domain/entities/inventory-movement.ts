import type { InventoryMovementDto } from '#dtos'
import { ValidationError } from '#errors'
import { Entity } from '../abstracts'

type MovementType = 'inbound' | 'outbound'

type MovementProps = {
  movementType: MovementType
  itemsQuantity: number
  responsibleId: string
  productId: string
  registeredAt: Date
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
        itemsQuantity: dto.itemsQuantity,
        responsibleId: dto.responsibleId,
        productId: dto.productId,
        registeredAt: new Date(),
      },
      dto.id,
    )
  }

  static isMovementType(movementType: string): movementType is MovementType {
    return ['inbound', 'outbound'].includes(movementType)
  }

  get dto(): InventoryMovementDto {
    return {
      id: this.id,
      movementType: this.props.movementType,
      itemsQuantity: this.props.itemsQuantity,
      responsibleId: this.props.responsibleId,
      productId: this.props.productId,
      registeredAt: this.props.registeredAt,
    }
  }

  get movementType(): MovementType {
    return this.props.movementType
  }

  get itemsQuantity(): number {
    return this.props.itemsQuantity
  }
  
  get responsibleId(): string {
    return this.props.responsibleId
  }

  get productId(): string {
    return this.props.productId
  }

  get registeredAt(): Date {
    return this.props.registeredAt
  }
}
