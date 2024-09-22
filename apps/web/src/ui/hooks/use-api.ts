import { NextApiClient } from '@/api/next/clients'
import { FileStorageService, ProductsService } from '@/api/services'
import { InventoryMovementsService } from '@/api/services/inventory-movements-service'
import { ENV } from '@/constants'

const nextApiClient = NextApiClient()
nextApiClient.setBaseUrl(ENV.serverUrl)

export function useApi() {
  return {
    inventoryMovementService: InventoryMovementsService(nextApiClient),
    productsService: ProductsService(nextApiClient),
    fileStorageService: FileStorageService(nextApiClient),
  }
}
