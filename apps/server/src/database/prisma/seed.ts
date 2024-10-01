import {
  BatchesFaker,
  InventoryMovementsFaker,
  ProductsFaker,
} from '@stocker/core/fakers'

import { batchesRepository, inventorymovementRepository, productsRepository } from '..'
import { prisma } from './prisma-client'
import { faker } from '@faker-js/faker'

const COMPANY_ID = 'eceda392-06df-4ed2-8c90-db6bf1e38830'
const MANAGER_ID = '29fcf7a0-5ee3-4cb0-b36e-ecc825f1cdaa'
const CATEGORY_ID = '602f6307-a60a-4825-b57d-873b97fe2bca'
const PRODUCT_ID = 'ca479caf-31f7-48ed-bc0c-7e3115d04e32'
const CONNECTION_POOL_SIZE = 5

async function seed() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE users, products, categories, companies CASCADE;
  `)

  await prisma.company.create({
    data: {
      id: COMPANY_ID,
      name: 'Bulk Bonilha',
    },
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
    data: {
      id: CATEGORY_ID,
      name: 'economicos',
      company_id: COMPANY_ID,
    },
  })

  const fakeProduct = ProductsFaker.fake({
    id: PRODUCT_ID,
    categoryId: CATEGORY_ID,
    companyId: COMPANY_ID,
  })
  await productsRepository.add(fakeProduct)

  const productPromises = []
  for (let index = 0; index < 50; index++) {
    const product = ProductsFaker.fake({
      id: faker.string.uuid(),
      categoryId: CATEGORY_ID,
      companyId: COMPANY_ID,
    })
    productPromises.push(
      productsRepository.add(product).then(async () => {
        const fakeBatches = BatchesFaker.fakeMany({
          productId: product.id,
        })
        const batchPromises = fakeBatches.map((batch) => batchesRepository.add(batch))

        const fakeInventoryMovements = InventoryMovementsFaker.fakeMany({
          product: { id: product.id },
          responsible: { id: MANAGER_ID },
        })
        const movementsPromise = fakeInventoryMovements.map((movement) =>
          inventorymovementRepository.add(movement),
        )

        await Promise.all([...batchPromises, ...movementsPromise])
      }),
    )

    if (productPromises.length >= CONNECTION_POOL_SIZE) {
      await Promise.allSettled(productPromises)
      productPromises.length = 0 
    }
  }

  if (productPromises.length > 0) {
    await Promise.allSettled(productPromises)
  }
}

seed()
  .then(() => {
    console.log('Database seeded')
  })
  .catch((error) => {
    console.error(`Error on seed the database: ${error}`)
  })
  .finally(() => prisma.$disconnect())
