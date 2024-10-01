import { fakerPT_BR as faker } from '@faker-js/faker'
import { Batch } from '../../src/domain/entities'
import { BatchDto } from '../../src/dtos'

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
      itemsCount: faker.number.int({ min: 0, max: 10000 }),
      expirationDate: faker.date.future().toString(),
      maximumDaysToExpiration: faker.number.int({ min: 0, max: 10000 }),
      registeredAt: new Date(),
      ...baseDto,
    }
  }
  static fakeMany(count = 10, baseDto?: Partial<BatchDto>, productsIds?: string[]) {
    return Array.from({ length: count }).map(() =>
      BatchesFaker.fake(baseDto, productsIds),
    )
  }
  static fakeManyDto(count = 10,baseDto?: Partial<BatchDto>, productsIds?: string[]) {
    return Array.from({ length: count }).map(() =>
      BatchesFaker.fakeDto(baseDto, productsIds),
    )
  }
}
