import {
  PrismaBatchesRepository,
  PrismaInventoryMovementsRepository,
  PrismaProductsRepository,
  PrismaCategoriesRepository,
  PrismaNotificationsRepository,
  PrismaCompaniesRepository,
} from './prisma/repositories'

export const productsRepository = new PrismaProductsRepository()
export const batchesRepository = new PrismaBatchesRepository()
export const inventoryMovementsRepository = new PrismaInventoryMovementsRepository()
export const categoriesRepository = new PrismaCategoriesRepository()
export const notificationsRepository = new PrismaNotificationsRepository()
export const companiesRepository = new PrismaCompaniesRepository()

