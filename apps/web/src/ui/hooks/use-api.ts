import { NextApiClient } from '@/api/next/next-api-client'
import { ProductsService } from '@/api/services'

const nextApiClient = NextApiClient()

export function useApi() {
  return {
    productsService: ProductsService(nextApiClient),
  }
}
