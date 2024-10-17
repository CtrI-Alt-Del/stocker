import { fakerPT_BR as faker } from '@faker-js/faker'
import { Category } from '../../src/domain/entities'
import type { CategoryDto } from '../../src/dtos'

export class CategoriesFaker {
    static fake(categoryDto?: Partial<CategoryDto>) {
        return Category.create(CategoriesFaker.fakeDto(categoryDto))
    }

    static fakeDto(baseDto?: Partial<CategoryDto>): CategoryDto {
        return {
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
            companyId: faker.string.uuid(),
            // subcategories: [],
            ...baseDto,     
        }
    }
    
  static fakeMany(count = 10, baseDto?: Partial<CategoryDto>) {
    return Array.from({ length: count }).map(() => CategoriesFaker.fake(baseDto))
  }

  static fakeManyDto(count = 10, baseDto?: Partial<CategoryDto>) {
    return Array.from({ length: count }).map(() => CategoriesFaker.fakeDto(baseDto))
  }
}

CategoriesFaker.fakeManyDto(10)