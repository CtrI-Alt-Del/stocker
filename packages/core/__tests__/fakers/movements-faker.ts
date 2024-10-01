import { fakerPT_BR as faker } from '@faker-js/faker'
import type { InventoryMovementDto } from '../../src/dtos'
import { InventoryMovement } from '../../src/domain/entities'

export class InventoryMovementsFaker {
  static fake(baseDto?: Partial<InventoryMovementDto>, productIds?: string[]) {
    return InventoryMovement.create(InventoryMovementsFaker.fakeDto(baseDto, productIds))
  }
  
  static fakeDto(baseDto?: Partial<InventoryMovementDto>, productIds?: string[]): InventoryMovementDto {
    return {
      id: faker.string.uuid(),
      movementType: faker.helpers.arrayElement(['inbound', 'outbound']),
      itemsCount: faker.number.int({min: 0, max: 10000}),
      remark: faker.commerce.productDescription(),
      registeredAt: new Date(),
      responsible: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
      },
      product: {
        id: productIds 
          ? faker.helpers.arrayElement(productIds) 
          : faker.string.uuid(), 
        name: faker.commerce.productName(),
      },
      ...baseDto,
    }
  }

  static fakeMany(count = 10, baseDto?: Partial<InventoryMovementDto>, productIds?: string[]) {
    return Array.from({ length: count }).map(() => InventoryMovementsFaker.fake(baseDto, productIds))
  }

  static fakeManyDto(count = 10, baseDto?: Partial<InventoryMovementDto>, productIds?: string[]) {
    return Array.from({ length: count }).map(() => 
      InventoryMovementsFaker.fakeDto(baseDto, productIds),
    )
  }
}


