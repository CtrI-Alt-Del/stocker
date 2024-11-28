import { NextApiClient } from '@/api/next/clients/next-api-client'
import {
  FileStorageService,
  ProductsService,
  BatchesService,
  ReportsService,
  AuthService,
  NotificationsService,
  CompaniesService,
  LocationsService,
  SuppliersService,
} from '@/api/services'
import { CategoriesService } from '@/api/services/categories-service'
import { InventoryMovementsService } from '@/api/services/inventory-movements-service'
import { UsersService } from '@/api/services/users-service'
import { BROWSER_ENV } from '@/constants'
import { useAuthContext } from '../components/contexts/auth-context'

const nextApiClient = NextApiClient()
nextApiClient.setBaseUrl(BROWSER_ENV.serverApiUrl)

export function useApi() {
  const { jwt } = useAuthContext()

  if (jwt) {
    nextApiClient.setHeader('Authorization', `Bearer ${jwt}`)
  }

  return {
    authService: AuthService(nextApiClient),
    locationsService: LocationsService(nextApiClient),
    usersService: UsersService(nextApiClient),
    suppliersService: SuppliersService(nextApiClient),
    reportsService: ReportsService(nextApiClient),
    inventoryMovementService: InventoryMovementsService(nextApiClient),
    productsService: ProductsService(nextApiClient),
    notificationService: NotificationsService(nextApiClient),
    batchesService: BatchesService(nextApiClient),
    fileStorageService: FileStorageService(nextApiClient),
    categoriesService: CategoriesService(nextApiClient),
    companiesService: CompaniesService(nextApiClient),
  }
}
