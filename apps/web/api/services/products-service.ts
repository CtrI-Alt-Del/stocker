import type { Product } from '@stocker/core/entities'
import type { IApiClient, IProductsService } from '@stocker/core/interfaces'

export const ProductsService = (apiClient: IApiClient): IProductsService => {
  return {
    async registerProduct(product: Product) {
      return await apiClient.get('/', product.dto)
    },
  }
}
