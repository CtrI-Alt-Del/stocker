import {
  PrismaBatchesRepository,
  PrismaInventoryMovementsRepository,
  PrismaProductsRepository,
  PrismaCategoriesRepository,
} from './prisma/repositories'

export const productsRepository = new PrismaProductsRepository()
export const batchesRepository = new PrismaBatchesRepository()
export const inventoryMovementsRepository = new PrismaInventoryMovementsRepository()
export const categoriesRepository = new PrismaCategoriesRepository()
