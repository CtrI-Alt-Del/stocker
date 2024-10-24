import { fakerPT_BR as faker } from '@faker-js/faker'
import { User } from '../../src/domain/entities'
import { UserDto } from '../../src/dtos/user-dto'
export class UsersFaker {
  static fake(baseDto?: Partial<UserDto>) {
    return User.create(UsersFaker.fakeDto(baseDto))
  }
  static fakeDto(baseDto?: Partial<UserDto>): UserDto {
    return {
      id: faker.string.uuid(),
      role: faker.helpers.arrayElement(['admin', 'manager', 'employee']),
      email: faker.internet.email(),
      name: faker.person.fullName(),
    }
  }
  static fakeMany(count = 10, baseDto?: Partial<UserDto>) {
    return Array.from({ length: count }).map(() => UsersFaker.fake(baseDto))
  }
  static fakeManyDto(count = 10, baseDto?: Partial<UserDto>) {
    return Array.from({ length: count }).map(() => UsersFaker.fakeDto(baseDto))
  }
}
