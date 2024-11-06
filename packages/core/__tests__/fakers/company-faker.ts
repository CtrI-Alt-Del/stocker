import { base, fakerPT_BR as faker } from '@faker-js/faker'
import { Company } from '../../src/domain/entities'
import type { CompanyDto } from '../../src/dtos'

export class CompanyFaker {
  static fake(baseDto?: Partial<CompanyDto>, depth = 0) {
    return Company.create(CompanyFaker.fakeDto(baseDto, depth))
  }

  static fakeDto(
    baseDto?: Partial<CompanyDto>,
    depth = 0,
  ): CompanyDto {
    return {
      id: faker.string.uuid(),
      name: faker.company.catchPhraseAdjective(),
      cnpj: faker.string.numeric({length: 14 }),
      ...baseDto,
    }
  }

  static fakeMany(count = 10, baseDto?: Partial<CompanyDto>, depth = 0) {
    return Array.from({ length: count }).map(() => CompanyFaker.fake(baseDto, depth))
  }

  static fakeManyDto(
    count = 10,
    baseDto?: Partial<CompanyDto>,
    depth = 0,
    parentId?: string,
  ) {
    return Array.from({ length: count }).map(() =>
      CompanyFaker.fakeDto(baseDto, depth),
    )
  }
}

CompanyFaker.fakeManyDto(10)
