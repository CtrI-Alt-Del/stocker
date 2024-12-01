import { fakerPT_BR as faker } from '@faker-js/faker'
import {
  RegisterInboundInventoryMovementUseCase,
  RegisterOutboundInventoryMovementUseCase,
} from '@stocker/core/use-cases'
import {
  batchesRepository,
  categoriesRepository,
  companiesRepository,
  inventoryMovementsRepository,
  productsRepository,
  suppliersRepository,
  usersRepository,
} from '..'
import { prisma } from './prisma-client'
import {
  BatchesFaker,
  CategoriesFaker,
  CompanyFaker,
  InventoryMovementsFaker,
  ProductsFaker,
  RolesFaker,
  SuppliersFaker,
  UsersFaker,
} from '@stocker/core/fakers'
import { CryptoProvider } from '@/providers/crypto-provider'
import { Role } from '@stocker/core/structs'
import { QueueProvider } from '@/providers/queue-provider'

const FAKE_COMPANY_ID = '29fcf7a0-5ee3-4cb0-b36e-ecc825f1cdaa'

const DEFAULT_ROLE_PERMISSIONS = [
  Role.create('admin', ['all']),
  Role.create('manager', [
    'products-control',
    'categories-control',
    'csv-export',
    'locations-control',
    'notifications-control',
    'suppliers-control',
    'reports',
  ]),
  Role.create('employee', ['inventory-movements']),
]

const registerInboundInventoryMovementUseCase =
  new RegisterInboundInventoryMovementUseCase(
    productsRepository,
    batchesRepository,
    inventoryMovementsRepository,
  )
const registerOutboundInventoryMovementUseCase =
  new RegisterOutboundInventoryMovementUseCase(
    batchesRepository,
    productsRepository,
    inventoryMovementsRepository,
    new QueueProvider([]),
  )

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

export async function registerOutboundMovement(
  itemsCount: number,
  productId: string,
  responsibleId: string,
) {
  const fakeInventoryMovement = InventoryMovementsFaker.fakeDto({
    itemsCount: itemsCount,
    product: { id: productId },
    responsible: { id: responsibleId },
    movementType: 'outbound',
  })

  await registerOutboundInventoryMovementUseCase.execute({
    inventoryMovementDto: fakeInventoryMovement,
  })
}

export async function seed() {
  const existingFakeCompany = await companiesRepository.findById(FAKE_COMPANY_ID)
  if (existingFakeCompany) await companiesRepository.delete(FAKE_COMPANY_ID)

  await prisma.role.deleteMany()
  await prisma.role.createMany({
    data: [{ name: 'admin' }, { name: 'manager' }, { name: 'employee' }],
  })

  const fakeCompany = CompanyFaker.fake({ id: FAKE_COMPANY_ID })
  const fakeSuppliers = SuppliersFaker.fakeMany(3, { companyId: fakeCompany.id })
  const fakeCategories = CategoriesFaker.fakeMany(3, { companyId: fakeCompany.id })
  if (!fakeCategories[0]) return
  const subCategory = CategoriesFaker.fake({
    parentCategoryId: fakeCategories[0].id,
    companyId: fakeCompany.id,
  })
  fakeCategories[0]?.appendSubcategory(subCategory)

  const fakeProductsWithSafeStock = ProductsFaker.fakeMany(60, {
    minimumStock: 10,
    category: { id: fakeCategories[0].id },
    supplier: { id: fakeSuppliers[0]?.id ?? '' },
    companyId: fakeCompany.id,
  })
  const fakeProductsWithAverageStock = ProductsFaker.fakeMany(30, {
    minimumStock: 100,
    category: { id: fakeCategories[1]?.id ?? '' },
    supplier: { id: fakeSuppliers[1]?.id ?? '' },
    companyId: fakeCompany.id,
  })
  const fakeProductsWithDangerStock = ProductsFaker.fakeMany(10, {
    minimumStock: 100,
    category: { id: fakeCategories[2]?.id ?? '' },
    supplier: { id: fakeSuppliers[2]?.id ?? '' },
    companyId: fakeCompany.id,
  })

  await Promise.all(
    DEFAULT_ROLE_PERMISSIONS.map((role) =>
      companiesRepository.addRolePermissions(role, fakeCompany.id),
    ),
  )

  const fakeUsers = UsersFaker.fakeMany(10, {
    role: RolesFaker.fake({ name: 'employee' }),
    companyId: fakeCompany.id,
  })
  fakeUsers.push(
    UsersFaker.fake({
      role: RolesFaker.fake({ name: 'admin' }),
      companyId: fakeCompany.id,
      email: 'stockerteampr@gmail.com',
      password: await new CryptoProvider().hash('stocker123'),
    }),
  )

  await companiesRepository.add(fakeCompany)

  await Promise.all([
    suppliersRepository.addMany(fakeSuppliers),
    usersRepository.addMany(fakeUsers),
    categoriesRepository.addMany(fakeCategories),
  ])

  await Promise.all([
    productsRepository.addMany(fakeProductsWithSafeStock),
    productsRepository.addMany(fakeProductsWithAverageStock),
    productsRepository.addMany(fakeProductsWithDangerStock),
  ])

  const inboundMovementPromises = []
  const outboundMovementPromises = []

  for (const fakeProduct of fakeProductsWithSafeStock) {
    inboundMovementPromises.push(
      registerInboundMovement(
        faker.number.int({ min: 1, max: 100 }),
        fakeProduct.id,
        getRandomRecord(fakeUsers)?.id ?? '',
      ),
    )

    outboundMovementPromises.push(
      registerInboundMovement(
        faker.number.int({ min: 1, max: 10 }),
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
  await Promise.all(outboundMovementPromises)
}

seed()
  .then(() => console.log('Database seeded successfully'))
  .catch((error) => console.error(`Error during seeding: ${error}`))
  .finally(() => prisma.$disconnect())
