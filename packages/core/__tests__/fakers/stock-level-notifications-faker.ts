import { fakerPT_BR as faker } from '@faker-js/faker'
import { StockLevelNotification } from '../../src/domain/entities'
import type { StockLevelNotificationDto } from '../../src/dtos'

export class StockLevelNotificationsFaker {
  static fakeStockLevelNotification(baseDto?: Partial<StockLevelNotificationDto>) {
    return StockLevelNotification.create(StockLevelNotificationsFaker.fakeDto(baseDto))
  }
  static fakeDto(
    baseDto?: Partial<StockLevelNotificationDto>,
  ): StockLevelNotificationDto {
    return {
      id: faker.string.uuid(),
      companyId: faker.string.uuid(),
      product: {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        code: faker.string.uuid(),
      },
      createdAt: faker.date.recent(),
      ...baseDto,
    }
  }

  static fakeMany(count = 10, baseDto?: Partial<StockLevelNotificationDto>) {
    return Array.from({ length: count }).map(() =>
      StockLevelNotificationsFaker.fakeStockLevelNotification(baseDto),
    )
  }

  static fakeManyDto(count = 10, baseDto?: Partial<StockLevelNotificationDto>) {
    return Array.from({ length: count }).map(() =>
      StockLevelNotificationsFaker.fakeDto(baseDto),
    )
  }
}
