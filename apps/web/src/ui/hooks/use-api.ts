import { NextApiClient } from '@/api/next/clients'
import { FileStorageService, ProductsService, BatchesService } from '@/api/services'
import { DashboardService } from '@/api/services/dashboard-service'
import { InventoryMovementsService } from '@/api/services/inventory-movements-service'
import { ENV } from '@/constants'

const nextApiClient = NextApiClient()
nextApiClient.setBaseUrl(ENV.serverUrl)

export function useApi() {
  return {
    dashboardService: DashboardService(nextApiClient),
    inventoryMovementService: InventoryMovementsService(nextApiClient),
    productsService: ProductsService(nextApiClient),
    batchesService: BatchesService(nextApiClient),
    fileStorageService: FileStorageService(nextApiClient),
  }
}
