import type { InventoryMovementDto } from '../../dtos'
import { ValidationError } from '../../errors'
import { Entity } from '../abstracts'
import type { User } from './user'

type MovementType = 'inbound' | 'outbound'

type MovementProps = {
  movementType: MovementType
  itemsCount: number
  responsibleId: string
  productId: string
  registeredAt: Date
  responsibleData: Pick<User, 'name'> | null
  remark: string | null
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
        responsibleId: dto.responsibleId,
        productId: dto.productId,
        registeredAt: new Date(),
        remark: dto.remark ?? null,
        responsibleData: null,
      },
      dto.id,
    )
  }

  static isMovementType(movementType: string): movementType is MovementType {
    return ['inbound', 'outbound'].includes(movementType)
  }

  get dto(): InventoryMovementDto {
    const dto: InventoryMovementDto = {
      id: this.id,
      movementType: this.props.movementType,
      itemsCount: this.props.itemsCount,
      responsibleId: this.props.responsibleId,
      productId: this.props.productId,
      registeredAt: this.props.registeredAt,
    }

    if (this.props.remark) dto.remark = this.props.remark

    return dto
  }

  set responsibleData(responsible: Pick<User, 'name'> | null) {
    this.props.responsibleData = responsible
  }

  get responsibleData() {
    return this.props.responsibleData
  }

  get movementType(): MovementType {
    return this.props.movementType
  }

  get itemsCount(): number {
    return this.props.itemsCount
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
