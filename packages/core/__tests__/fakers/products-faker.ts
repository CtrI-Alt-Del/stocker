import { fakerPT_BR as faker } from '@faker-js/faker'

import type { ProductDto } from '#dtos'
import { Product } from '#domain/entities'

export class ProductsFaker {
  static fake(baseDto?: Partial<ProductDto>) {
    return Product.create({
      id: faker.string.uuid(),
      image: faker.image.url(),
      description: faker.commerce.productDescription(),
      code: faker.commerce.isbn(),
      name: faker.commerce.productName(),
      height: faker.number.int({ min: 0, max: 100 }),
      width: faker.number.int({ min: 0, max: 100 }),
      length: faker.number.int({ min: 0, max: 100 }),
      brand: faker.company.name(),
      weight: faker.number.int({ min: 0, max: 100 }),
      minimumStock: faker.number.int({ min: 5, max: 100 }),
      costPrice: faker.number.float({ min: 0, max: 100 }),
      sellingPrice: faker.number.float({ min: 0, max: 100 }),
      uom: faker.string.sample({ min: 1, max: 3 }),
      categoryId: faker.string.uuid(),
      companyId: faker.string.uuid(),
      batches: [],
      ...baseDto,
    })
  }

  static fakeMany(count = 10, baseDto?: Partial<ProductDto>) {
    return Array.from({ length: count }).map(() => ProductsFaker.fake(baseDto))
  }
}
