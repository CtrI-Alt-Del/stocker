import type { InventoryMovementDto } from '../../dtos'
import { ValidationError } from '../../errors'
import type { InventoryMovementType } from '../../types'
import type { Product } from './product'
import type { User } from './user'
import { Entity } from '../abstracts'

type MovementProps = {
  movementType: InventoryMovementType
  itemsCount: number
  registeredAt: Date
  remark: string | null
  product: {
    id: string
    entity?: Product
  }
  responsible: {
    id: string
    entity?: User
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

  set responsible(responsible: User) {
    this.props.responsible.entity = responsible
  }

  get responsible(): User | undefined {
    return this.props.responsible.entity
  }

  get responsibleId() {
    return this.props.responsible.id
  }

  set product(product: Product) {
    this.props.product.entity = product
  }

  get product(): Product | undefined {
    return this.props.product.entity
  }

  get productId() {
    return this.props.product.id
  }

  get registeredAt(): Date {
    return this.props.registeredAt
  }

  get remark(): string | null {
    return this.props.remark
  }
}
