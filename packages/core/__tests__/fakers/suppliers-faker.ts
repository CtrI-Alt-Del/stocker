import { fakerPT_BR as faker } from '@faker-js/faker'
import { Supplier } from '../../src/domain/entities'
import type { SupplierDto } from '../../src/dtos/supplier-dto'

export class SuppliersFaker {
  static fake(baseDto?: Partial<SupplierDto>) {
    return Supplier.create(SuppliersFaker.fakeDto(baseDto))
  }

  static fakeDto(baseDto?: Partial<SupplierDto>): SupplierDto {
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      cnpj: '',
      phone: '',
      companyId: '',
      ...baseDto,
    }
  }

  static fakeMany(count = 10, baseDto?: Partial<SupplierDto>) {
    return Array.from({ length: count }).map(() => SuppliersFaker.fake(baseDto))
  }

  static fakeManyDto(count = 10, baseDto?: Partial<SupplierDto>) {
    return Array.from({ length: count }).map(() => SuppliersFaker.fakeDto(baseDto))
  }
}
