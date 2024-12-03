import { fakerPT_BR as faker } from '@faker-js/faker'
import { User } from '../../src/domain/entities'
import type { UserDto } from '../../src/dtos/user-dto'
import { RolesFaker } from './roles-faker'
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
      password: faker.internet.password(),
      companyId: '',
      hasFirstPasswordReset: false,
      ...baseDto,
    }
  }
  static fakeMany(count = 10, baseDto?: Partial<UserDto>) {
    return Array.from({ length: count }).map(() => UsersFaker.fake(baseDto))
  }
  static fakeManyDto(count = 10, baseDto?: Partial<UserDto>) {
    return Array.from({ length: count }).map(() => UsersFaker.fakeDto(baseDto))
  }
}
