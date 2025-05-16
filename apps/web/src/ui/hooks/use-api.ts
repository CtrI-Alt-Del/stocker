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
  ChatbotService,
} from '@/api/services'
import { CategoriesService } from '@/api/services/categories-service'
import { InventoryMovementsService } from '@/api/services/inventory-movements-service'
import { UsersService } from '@/api/services/users-service'
import { BROWSER_ENV } from '@/constants'
import { useAuthContext } from '../components/contexts/auth-context'

const serverRestClient = NextApiClient()
serverRestClient.setBaseUrl(BROWSER_ENV.serverApiUrl)

const chatbotRestClient = NextApiClient()
chatbotRestClient.setBaseUrl(BROWSER_ENV.chatbotRestUrl)

export function useApi() {
  const { jwt } = useAuthContext()

  if (jwt) {
    serverRestClient.setHeader('Authorization', `Bearer ${jwt}`)
  }

  return {
    authService: AuthService(serverRestClient),
    locationsService: LocationsService(serverRestClient),
    usersService: UsersService(serverRestClient),
    suppliersService: SuppliersService(serverRestClient),
    reportsService: ReportsService(serverRestClient),
    inventoryMovementService: InventoryMovementsService(serverRestClient),
    productsService: ProductsService(serverRestClient),
    notificationService: NotificationsService(serverRestClient),
    batchesService: BatchesService(serverRestClient),
    fileStorageService: FileStorageService(serverRestClient),
    categoriesService: CategoriesService(serverRestClient),
    companiesService: CompaniesService(serverRestClient),
    chatbotService: ChatbotService(chatbotRestClient),
  }
}
