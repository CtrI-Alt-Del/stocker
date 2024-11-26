import { fakerPT_BR as faker } from '@faker-js/faker'
import { ExpirationDateNotification } from '../../src/domain/entities'
import type { ExpirationDateNotificationDto } from '../../src/dtos'
import { BatchesFaker } from './batch-faker'

export class ExpirationDateNotificationsFaker {
  static fakeExpirationDateNotification(
    baseDto?: Partial<ExpirationDateNotificationDto>,
  ) {
    return ExpirationDateNotification.create(
      ExpirationDateNotificationsFaker.fakeDto(baseDto),
    )
  }

  static fakeDto(
    baseDto?: Partial<ExpirationDateNotificationDto>,
  ): ExpirationDateNotificationDto {
    const fixedDate = new Date('2023-01-01T00:00:00.000Z')
    return {
      id: faker.string.uuid(),
      companyId: faker.string.uuid(),
      batchDto: BatchesFaker.fakeDto(),
      registeredAt: baseDto?.registeredAt ?? fixedDate,
      ...baseDto,
    }
  }

  static fakeMany(count = 10, baseDto?: Partial<ExpirationDateNotificationDto>) {
    return Array.from({ length: count }).map(() =>
      ExpirationDateNotificationsFaker.fakeExpirationDateNotification(baseDto),
    )
  }

  static fakeManyDto(count = 10, baseDto?: Partial<ExpirationDateNotificationDto>) {
    return Array.from({ length: count }).map(() =>
      ExpirationDateNotificationsFaker.fakeDto(baseDto),
    )
  }
}
