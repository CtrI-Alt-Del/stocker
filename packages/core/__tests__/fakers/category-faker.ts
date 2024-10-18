import { base, fakerPT_BR as faker } from '@faker-js/faker'
import { Category } from '../../src/domain/entities'
import type { CategoryDto } from '../../src/dtos'

export class CategoriesFaker {
  static fake(categoryDto?: Partial<CategoryDto>, depth = 0) {
    return Category.create(CategoriesFaker.fakeDto(categoryDto, depth))
  }

  static fakeDto(
    baseDto?: Partial<CategoryDto>,
    depth = 0,
    parentId?: string,
  ): CategoryDto {
    const id = faker.string.uuid()

    const subCategories =
      depth < 1 ? CategoriesFaker.fakeManyDto(2, {}, depth + 1, id) : []

    return {
      id: id,
      name: faker.commerce.productName(),
      companyId: faker.string.uuid(),
      parentCategoryId: parentId || undefined,
      subCategories: subCategories,
      ...baseDto,
    }
  }

  static fakeMany(count = 10, baseDto?: Partial<CategoryDto>, depth = 0) {
    return Array.from({ length: count }).map(() => CategoriesFaker.fake(baseDto, depth))
  }

  static fakeManyDto(
    count = 10,
    baseDto?: Partial<CategoryDto>,
    depth = 0,
    parentId?: string,
  ) {
    return Array.from({ length: count }).map(() =>
      CategoriesFaker.fakeDto(baseDto, depth, parentId),
    )
  }
}

CategoriesFaker.fakeManyDto(10)
