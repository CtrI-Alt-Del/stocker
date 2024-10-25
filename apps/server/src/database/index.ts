import {
  PrismaBatchesRepository,
  PrismaInventoryMovementsRepository,
  PrismaProductsRepository,
  PrismaCategoriesRepository,
  PrismaCompaniesRepository,
  PrismaUsersRepository,
} from './prisma/repositories'

export const productsRepository = new PrismaProductsRepository()
export const batchesRepository = new PrismaBatchesRepository()
export const usersRepository = new PrismaUsersRepository()
export const inventoryMovementsRepository = new PrismaInventoryMovementsRepository()
export const categoriesRepository = new PrismaCategoriesRepository()
export const companiesRepository = new PrismaCompaniesRepository()
