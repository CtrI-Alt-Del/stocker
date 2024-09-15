import type { InventoryMovementDto } from '#dtos'
import { ValidationError } from '#errors'
import { Entity } from '../abstracts'

type MovementType = 'inbound' | 'outbound'

type MovementProps = {
  movementType: MovementType
  itemsQuantity: number
  responsibleId: string
  productId: string
  companyId: string
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
        companyId: dto.companyId,
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
      companyId: this.props.companyId,
      responsibleId: this.props.responsibleId,
      productId: this.props.productId,
      registeredAt: this.props.registeredAt,
    }
  }
}
