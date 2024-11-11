import { fakerPT_BR as faker } from '@faker-js/faker'
import { StockLevelNotification } from '../../src/domain/entities'
import type { StockLevelNotificationDto } from '../../src/dtos'

export class StockLevelNotificationsFaker {
  static fake(baseDto?: Partial<StockLevelNotificationDto>) {
    return StockLevelNotification.create(StockLevelNotificationsFaker.fakeDto(baseDto))
  }
  static fakeDto(
    baseDto?: Partial<StockLevelNotificationDto>,
  ): StockLevelNotificationDto {
    const fixedDate = new Date('2023-01-01T00:00:00.000Z')
    return {
      id: faker.string.uuid(),
      companyId: faker.string.uuid(),
      product: {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        code: faker.string.uuid(),
      },
      sentAt: baseDto?.sentAt ?? fixedDate,
      ...baseDto,
    }
  }

  static fakeMany(count = 10, baseDto?: Partial<StockLevelNotificationDto>) {
    return Array.from({ length: count }).map(() =>
      StockLevelNotificationsFaker.fake(baseDto),
    )
  }

  static fakeManyDto(count = 10, baseDto?: Partial<StockLevelNotificationDto>) {
    return Array.from({ length: count }).map(() =>
      StockLevelNotificationsFaker.fakeDto(baseDto),
    )
  }
}
