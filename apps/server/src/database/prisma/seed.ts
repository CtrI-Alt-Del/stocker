import { ProductsFaker } from '@stocker/core/fakers'

import { productsRepository } from '..'
import { prisma } from './prisma-client'

const COMPANY_ID = 'eceda392-06df-4ed2-8c90-db6bf1e38830'
const MANAGER_ID = '29fcf7a0-5ee3-4cb0-b36e-ecc825f1cdaa'
const CATEGORY_ID = '602f6307-a60a-4825-b57d-873b97fe2bca'
const PRODUCT_ID = 'ca479caf-31f7-48ed-bc0c-7e3115d04e32'

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
}

seed()
  .then(() => {
    console.log('Database seeded')
  })
  .catch((error) => {
    console.error(`Error on seed the database: ${error}`)
  })
  .finally(() => prisma.$disconnect())
