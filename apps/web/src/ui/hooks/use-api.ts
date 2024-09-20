import { NextApiClient } from '@/api/next/next-api-client'
import { FileStorageService, ProductsService } from '@/api/services'
import { MovementService } from '@/api/services/movement-service'
import { ENV } from '@/constants'

const nextApiClient = NextApiClient()
nextApiClient.setBaseUrl(ENV.serverUrl)

export function useApi() {
  return {
    inventoryMovementService: MovementService(nextApiClient),
    productsService: ProductsService(nextApiClient),
    fileStorageService: FileStorageService(nextApiClient),
  }
}
