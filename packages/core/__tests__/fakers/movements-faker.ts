import { base, fakerPT_BR as faker } from '@faker-js/faker'
import type { InventoryMovementDto } from '../../src/dtos'
import { InventoryMovement } from '../../src/domain/entities'
import { InventoryMovementType } from '@prisma/client'

export class InventoryMovementsFaker {
  static fake(baseDto?: Partial<InventoryMovementDto>, productIds?: string[]) {
    return InventoryMovement.create(InventoryMovementsFaker.fakeDto(baseDto, productIds))
  }

  static fakeDto(
    baseDto?: Partial<InventoryMovementDto>,
    productIds?: string[],
  ): InventoryMovementDto {
    const movementType = faker.helpers.arrayElement(['inbound', 'outbound'])

    return {
      id: faker.string.uuid(),
      movementType: movementType.toString(),
      itemsCount: faker.number.int({ min: 0, max: 10 }),
      remark: faker.commerce.productDescription(),
      registeredAt: faker.date.between({
        from: new Date(new Date().setMonth(new Date().getMonth() - 12)),
        to: new Date(),
      }),
      responsible: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
      },
      product: {
        id: productIds ? faker.helpers.arrayElement(productIds) : faker.string.uuid(),
        name: faker.commerce.productName(),
      },
      ...baseDto,
    }
  }

  static fakeMany(count = 10, baseDto?: Partial<InventoryMovementDto>) {
    const fakeInventoryMovements = []
    for (let i = 0; i < count; i++) {
      fakeInventoryMovements.push(InventoryMovementsFaker.fake(baseDto))
    }
    return fakeInventoryMovements
  }

  static fakeManyDto(baseDto?: Partial<InventoryMovementDto>) {
    const count = faker.number.int({ min: 1, max: 10 })

    const inventoryMovementDtos = []
    for (let i = 0; i < count; i++) {
      inventoryMovementDtos.push(InventoryMovementsFaker.fakeDto(baseDto))
    }
    return inventoryMovementDtos
  }
}
