import { fakerPT_BR as faker } from '@faker-js/faker'
import { Batch } from '../../src/domain/entities'
import type { BatchDto } from '../../src/dtos'

export class BatchesFaker {
  static fake(baseDto?: Partial<BatchDto>, productsIds?: string[]) {
    return Batch.create(BatchesFaker.fakeDto(baseDto, productsIds))
  }

  static fakeDto(baseDto?: Partial<BatchDto>, productsIds?: string[]): BatchDto {
    return {
      id: faker.string.uuid(),
      productId: productsIds
        ? faker.helpers.arrayElement(productsIds)
        : faker.string.uuid(),
      code: faker.string.uuid(),
      itemsCount: 10,
      expirationDate: faker.date.future(),
      maximumDaysToExpiration: faker.number.int({ min: 0, max: 1000 }),
      registeredAt: new Date(),
      ...baseDto,
    }
  }

  static fakeMany(count = 20, baseDto?: Partial<BatchDto>, productsIds?: string[]) {
    const batches = []
    for (let i = 0; i < count; i++) {
      batches.push(BatchesFaker.fake(baseDto, productsIds))
    }
    return batches
  }

  static fakeManyDto(count = 20, baseDto?: Partial<BatchDto>, productsIds?: string[]) {
    const batchDtos = []
    for (let i = 0; i < count; i++) {
      batchDtos.push(BatchesFaker.fakeDto(baseDto, productsIds))
    }
    return batchDtos
  }
}
