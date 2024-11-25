import {
  PrismaBatchesRepository,
  PrismaInventoryMovementsRepository,
  PrismaProductsRepository,
  PrismaCategoriesRepository,
  PrismaNotificationsRepository,
  PrismaCompaniesRepository,
  PrismaUsersRepository,
  PrismaLocationsRepository,
  PrismaSuppliersRepository,
} from './prisma/repositories'

export const usersRepository = new PrismaUsersRepository()
export const productsRepository = new PrismaProductsRepository()
export const batchesRepository = new PrismaBatchesRepository()
export const inventoryMovementsRepository = new PrismaInventoryMovementsRepository()
export const categoriesRepository = new PrismaCategoriesRepository()
export const notificationsRepository = new PrismaNotificationsRepository()
export const companiesRepository = new PrismaCompaniesRepository()
export const locationsRepository = new PrismaLocationsRepository()
export const suppliersRepository = new PrismaSuppliersRepository()