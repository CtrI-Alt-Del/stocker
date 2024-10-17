import {
  BatchesFaker,
  InventoryMovementsFaker,
  ProductsFaker,
  CategoriesFaker
} from '@stocker/core/fakers'

import { batchesRepository, categoriesRepository, inventoryMovementsRepository, productsRepository} from '..'
import { prisma } from './prisma-client'
import { fakerPT_BR as faker } from '@faker-js/faker'

const COMPANY_ID = 'eceda392-06df-4ed2-8c90-db6bf1e38830'
const MANAGER_ID = '29fcf7a0-5ee3-4cb0-b36e-ecc825f1cdaa'
const CATEGORY_ID = '602f6307-a60a-4825-b57d-873b97fe2bca'
const PRODUCT_ID = 'ca479caf-31f7-48ed-bc0c-7e3115d04e32'
const CONNECTION_POOL_SIZE = 3

async function seedDatabase() {
  await resetDatabase()
console.log("Cheguei aqui 1")
  await createBaseEntities()

  console.log("Cheguei aqui 2")
  await seedMainProduct()
  console.log("Cheguei aqui 3")
  const categories = await createManyFakeCategory(20)
  console.log("Cheguei aqui 4")
  await seedMultipleProducts(10, categories)
  console.log("Cheguei aqui 5")
  await seedMultipleProductsWithoutRelatedData(10)
  console.log("Cheguei aqui 6")
  await seedMultipleProductsWithMinimumBatches(10)
  console.log("manocu neininha")
}

async function resetDatabase() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE users, products, categories, companies CASCADE;
  `)
}

async function createBaseEntities() {
  await prisma.company.create({
    data: { id: COMPANY_ID, name: 'Bulk Bonilha' },
  })

  await prisma.user.create({
    data: {
      id: MANAGER_ID,
      name: 'Hector Bonilha',
      email: 'hector@gmail.com',
      role: 'MANAGER',
      company_id: COMPANY_ID,
    },
  })

  await prisma.category.create({
    data: { id: CATEGORY_ID, name: 'economicos', company_id: COMPANY_ID },
  })
}

async function seedMainProduct() {
  const mainProduct = ProductsFaker.fake({
    id: PRODUCT_ID,
    categoryId: CATEGORY_ID,
    companyId: COMPANY_ID,
  })

  await productsRepository.add(mainProduct)
}

async function seedMultipleProducts(count: number, categories: string[]) {
  const productPromises = []

  for (let i = 0; i < count; i++) {
    const index = faker.number.int({min: 0, max: categories.length -1})
    const newProduct = createFakeProduct(categories[index])
    productPromises.push(seedProductAndRelatedData(newProduct))

    if (productPromises.length >= CONNECTION_POOL_SIZE) {
      await Promise.allSettled(productPromises)
      productPromises.length = 0
    }
  }

  if (productPromises.length > 0) {
    await Promise.allSettled(productPromises)
  }
}

async function createManyFakeCategory(number: number) {
  const categoryPromises = []
  const categoryIds = []

  for (let index = 0; index < number; index++) {
    const newCategory = createFakeCategory()
    categoryIds.push(newCategory.id)
    categoryPromises.push(categoriesRepository.add(newCategory))
    if (categoryPromises.length >= CONNECTION_POOL_SIZE) {
      await Promise.allSettled(categoryPromises)
      categoryPromises.length = 0
    }
    
  }

  if (categoryPromises.length > 0) {
    await Promise.allSettled(categoryPromises)
  }
  return categoryIds
}

async function seedMultipleProductsWithoutRelatedData(count: number) {
  const productPromises = []
  for (let i = 0; i < count; i++) {
    const newProduct = createFakeProduct()
    productPromises.push(productsRepository.add(newProduct))
    if (productPromises.length >= CONNECTION_POOL_SIZE) {
      await Promise.allSettled(productPromises)
    }
  }
  if (productPromises.length > 0) {
    await Promise.allSettled(productPromises)
  }
}
async function seedMultipleProductsWithMinimumBatches(count: number) {
  const productPromises = []
  for (let i = 0; i < count; i++) {
    const newProduct = createFakeProduct()
    productPromises.push(seedProductWithMinimumData(newProduct))
    if (productPromises.length >= CONNECTION_POOL_SIZE) {
      await Promise.allSettled(productPromises)
    }
  }
  if (productPromises.length > 0) {
    await Promise.allSettled(productPromises)
  }
}
function createFakeProduct(categoryId?: string) {
  return ProductsFaker.fake({
    id: faker.string.uuid(),
    categoryId: categoryId ? categoryId : CATEGORY_ID,
    companyId: COMPANY_ID,
  })
}
function createFakeCategory(){
  return CategoriesFaker.fake({
    id:faker.string.uuid(), 
    companyId: COMPANY_ID
  })
}

async function seedProductAndRelatedData(product: any) {
  await productsRepository.add(product)

  await Promise.all([
    seedBatchesForProduct(product.id),
    seedInventoryMovementsForProduct(product.id),
  ])
}
async function seedProductWithMinimumData(product: any) {
  await productsRepository.add(product)
  await Promise.all([seedMinimumBatchesForProduct(product.id, 9)])
}
async function seedBatchesForProduct(productId: string) {
  const fakeBatches = BatchesFaker.fakeMany(20, { productId })
  const batchPromises = fakeBatches.map((batch) => batchesRepository.add(batch))
  await Promise.all(batchPromises)
}

async function seedInventoryMovementsForProduct(productId: string) {
  const count = faker.number.int({ min: 1, max: 10 })

  const fakeMovements = InventoryMovementsFaker.fakeMany(count, {
    product: { id: productId },
    responsible: { id: MANAGER_ID },
  })
  const promises = fakeMovements.map((movement) =>
    inventoryMovementsRepository.add(movement),
  )
  await Promise.all(promises)
}
async function seedMinimumBatchesForProduct(productId: string, count: number) {
  const fakeBatch = BatchesFaker.fakeMany(count, { productId })
  const batchPromises = fakeBatch.map((batch) => batchesRepository.add(batch))
  await Promise.all(batchPromises)
}

seedDatabase()
  .then(() => console.log('Database seeded successfully'))
  .catch((error) => console.error(`Error during seeding: ${error}`))
  .finally(() => prisma.$disconnect())
