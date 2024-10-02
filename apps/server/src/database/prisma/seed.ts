import {
  BatchesFaker,
  InventoryMovementsFaker,
  ProductsFaker,
} from '@stocker/core/fakers'

import { batchesRepository, inventorymovementRepository, productsRepository } from '..'
import { prisma } from './prisma-client'
import { fakerPT_BR as faker } from '@faker-js/faker'

const COMPANY_ID = 'eceda392-06df-4ed2-8c90-db6bf1e38830'
const MANAGER_ID = '29fcf7a0-5ee3-4cb0-b36e-ecc825f1cdaa'
const CATEGORY_ID = '602f6307-a60a-4825-b57d-873b97fe2bca'
const PRODUCT_ID = 'ca479caf-31f7-48ed-bc0c-7e3115d04e32'
const CONNECTION_POOL_SIZE = 3

async function seedDatabase() {
  await resetDatabase()
  await createBaseEntities()
  await seedMainProduct()
  await seedMultipleProducts(50)
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

async function seedMultipleProducts(count: number) {
  const productPromises = []

  for (let i = 0; i < count; i++) {
    const newProduct = createFakeProduct()
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

function createFakeProduct() {
  return ProductsFaker.fake({
    id: faker.string.uuid(),
    categoryId: CATEGORY_ID,
    companyId: COMPANY_ID,
  })
}

async function seedProductAndRelatedData(product: any) {
  await productsRepository.add(product)

  await Promise.all([
    seedBatchesForProduct(product.id),
    seedInventoryMovementsForProduct(product.id),
  ])
}

async function seedBatchesForProduct(productId: string) {
  const fakeBatches = BatchesFaker.fakeMany({ productId })
  const batchPromises = fakeBatches.map((batch) => batchesRepository.add(batch))
  await Promise.all(batchPromises)
}

async function seedInventoryMovementsForProduct(productId: string) {
  const fakeMovements = InventoryMovementsFaker.fakeMany({
    product: { id: productId },
    responsible: { id: MANAGER_ID },
  })
  const movementPromises = fakeMovements.map((movement) =>
    inventorymovementRepository.add(movement),
  )
  await Promise.all(movementPromises)
}

seedDatabase()
  .then(() => console.log('Database seeded successfully'))
  .catch((error) => console.error(`Error during seeding: ${error}`))
  .finally(() => prisma.$disconnect())
