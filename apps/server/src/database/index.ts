import { PrismaBatchesRepository, PrismaInventoryMovementsRepository, PrismaProductsRepository } from './prisma/repositories'

export const productsRepository = new PrismaProductsRepository()
export const batchRepository = new PrismaBatchesRepository()
export const inventorymovementRepository = new PrismaInventoryMovementsRepository()
