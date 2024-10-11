import { NextApiClient } from '@/api/next/clients'
import {
  FileStorageService,
  ProductsService,
  BatchesService,
  ReportsService,
} from '@/api/services'
import { CategoriesService } from '@/api/services/categories-service'
import { InventoryMovementsService } from '@/api/services/inventory-movements-service'
import { ENV } from '@/constants'

const nextApiClient = NextApiClient()
nextApiClient.setBaseUrl(ENV.serverUrl)

export function useApi() {
  return {
    reportsService: ReportsService(nextApiClient),
    inventoryMovementService: InventoryMovementsService(nextApiClient),
    productsService: ProductsService(nextApiClient),
    batchesService: BatchesService(nextApiClient),
    fileStorageService: FileStorageService(nextApiClient),
    categoriesService: CategoriesService(nextApiClient),
  }
}
