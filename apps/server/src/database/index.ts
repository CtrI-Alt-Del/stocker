import {
  PrismaBatchesRepository,
  PrismaInventoryMovementsRepository,
  PrismaProductsRepository,
  PrismaCategoriesRepository,
  PrismaCompaniesRepository,
} from './prisma/repositories'

export const productsRepository = new PrismaProductsRepository()
export const batchesRepository = new PrismaBatchesRepository()
export const inventoryMovementsRepository = new PrismaInventoryMovementsRepository()
export const categoriesRepository = new PrismaCategoriesRepository()
export const companiesRepository = new PrismaCompaniesRepository()
