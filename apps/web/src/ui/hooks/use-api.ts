import { NextApiClient } from '@/api/next/next-api-client'
import { ProductsService } from '@/api/services'
import { ENV } from '@/constants'

const nextApiClient = NextApiClient()
nextApiClient.setBaseUrl(ENV.serverUrl)

export function useApi() {
  return {
    productsService: ProductsService(nextApiClient),
  }
}
