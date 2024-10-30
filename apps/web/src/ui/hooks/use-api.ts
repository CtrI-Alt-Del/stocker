import { NextApiClient } from '@/api/next/clients'
import {
  FileStorageService,
  ProductsService,
  BatchesService,
  ReportsService,
  AuthService,
  NotificationsService,
} from '@/api/services'
import { CategoriesService } from '@/api/services/categories-service'
import { InventoryMovementsService } from '@/api/services/inventory-movements-service'
import { UsersService } from '@/api/services/users-service'
import { ENV } from '@/constants'

const nextApiClient = NextApiClient()
nextApiClient.setBaseUrl(ENV.serverUrl)

export function useApi() {
  return {
    authService: AuthService(nextApiClient),
    usersService: UsersService(nextApiClient),
    reportsService: ReportsService(nextApiClient),
    inventoryMovementService: InventoryMovementsService(nextApiClient),
    productsService: ProductsService(nextApiClient),
    notificationService: NotificationsService(nextApiClient),
    batchesService: BatchesService(nextApiClient),
    fileStorageService: FileStorageService(nextApiClient),
    categoriesService: CategoriesService(nextApiClient),
  }
}
