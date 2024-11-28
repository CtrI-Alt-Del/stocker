import { fakerPT_BR as faker } from '@faker-js/faker'
import { RegisterInboundInventoryMovementUseCase } from '@stocker/core/use-cases'
import {
  batchesRepository,
  inventoryMovementsRepository,
  productsRepository,
  usersRepository,
} from '..'
import { prisma } from './prisma-client'
import {
  BatchesFaker,
  CategoriesFaker,
  InventoryMovementsFaker,
  ProductsFaker,
  SuppliersFaker,
  UsersFaker,
} from '@stocker/core/fakers'

const registerInboundInventoryMovementUseCase =
  new RegisterInboundInventoryMovementUseCase(
    productsRepository,
    batchesRepository,
    inventoryMovementsRepository,
  )

async function resetDatabase() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE companies CASCADE;
  `)
}

function getRandomRecord<Record>(records: Record[]) {
  const randomIndex = Math.floor(Math.random() * records.length)
  return records[randomIndex]
}

export async function registerInboundMovement(
  itemsCount: number,
  productId: string,
  responsibleId: string,
) {
  const fakeBatch = BatchesFaker.fakeDto({ productId, itemsCount })
  const fakeInventoryMovement = InventoryMovementsFaker.fakeDto({
    itemsCount: itemsCount,
    product: { id: productId },
    responsible: { id: responsibleId },
    movementType: 'inbound',
  })

  await registerInboundInventoryMovementUseCase.execute({
    batchDto: fakeBatch,
    inventoryMovementDto: fakeInventoryMovement,
  })
}

export async function seed() {
  await resetDatabase()

  const fakeSuppliers = SuppliersFaker.fakeMany(3)
  const fakeCategories = CategoriesFaker.fakeMany(3)
  if (!fakeCategories[0]) return
  const subCategory = CategoriesFaker.fake({ parentCategoryId: fakeCategories[0].id })
  fakeCategories[0]?.appendSubcategory(subCategory)

  const fakeProductsWithSafeStock = ProductsFaker.fakeMany(60, { minimumStock: 10 })
  const fakeProductsWithAverageStock = ProductsFaker.fakeMany(30, { minimumStock: 100 })
  const fakeProductsWithDangerStock = ProductsFaker.fakeMany(10, { minimumStock: 100 })
  const fakeUsers = UsersFaker.fakeMany(10, { role: 'employee' })

  await Promise.all([
    usersRepository.addMany(fakeUsers),
    usersRepository.addMany(fakeUsers),
    productsRepository.addMany(fakeProductsWithSafeStock),
    productsRepository.addMany(fakeProductsWithAverageStock),
    productsRepository.addMany(fakeProductsWithDangerStock),
  ])

  const inboundMovementPromises = []

  for (const fakeProduct of fakeProductsWithSafeStock) {
    inboundMovementPromises.push(
      registerInboundMovement(
        faker.number.int({ min: 11, max: 500 }),
        fakeProduct.id,
        getRandomRecord(fakeUsers)?.id ?? '',
      ),
    )
  }

  for (const fakeProduct of fakeProductsWithAverageStock) {
    inboundMovementPromises.push(
      registerInboundMovement(
        faker.number.int({ min: 2, max: 99 }),
        fakeProduct.id,
        getRandomRecord(fakeUsers)?.id ?? '',
      ),
    )
  }

  for (const fakeProduct of fakeProductsWithDangerStock) {
    inboundMovementPromises.push(
      registerInboundMovement(0, fakeProduct.id, getRandomRecord(fakeUsers)?.id ?? ''),
    )
  }

  await Promise.all(inboundMovementPromises)
}
