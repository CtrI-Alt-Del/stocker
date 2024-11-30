import { fakerPT_BR as faker } from '@faker-js/faker'
import { Role } from '../../src/domain/structs'

type RoleDto = {
  name: string
  permissions: string[]
}

export class RolesFaker {
  static fake(baseDto?: Partial<RoleDto>) {
    const fakeDto = RolesFaker.fakeDto(baseDto)
    return Role.create(fakeDto.name, fakeDto.permissions)
  }

  static fakeDto(baseDto?: Partial<RoleDto>): RoleDto {
    return {
      name: faker.person.jobTitle(),
      permissions: [],
      ...baseDto,
    }
  }

  static fakeMany(count = 10, baseDto?: Partial<RoleDto>) {
    return Array.from({ length: count }).map(() => RolesFaker.fake(baseDto))
  }

  static fakeManyDto(count = 10, baseDto?: Partial<RoleDto>) {
    return Array.from({ length: count }).map(() => RolesFaker.fakeDto(baseDto))
  }
}
