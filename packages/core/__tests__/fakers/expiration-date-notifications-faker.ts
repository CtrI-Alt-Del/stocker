import { fakerPT_BR as faker } from '@faker-js/faker'
import { ExpirationDateNotification } from '../../src/domain/entities'
import type { ExpirationDateNotificationDto } from '../../src/dtos'

export class ExpirationDateNotificationsFaker {
  static fakeExpirationDateNotification(
    baseDto?: Partial<ExpirationDateNotificationDto>,
  ) {
    return ExpirationDateNotification.create(
      ExpirationDateNotificationsFaker.fakeDto(baseDto),
    )
  }

  static fakeDto(baseDto?: Partial<ExpirationDateNotificationDto>) {
    return {
      id: faker.string.uuid(),
      companyId: faker.string.uuid(),
      batch: {
        id: faker.string.uuid(),
        code: faker.string.uuid(),
      },
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
