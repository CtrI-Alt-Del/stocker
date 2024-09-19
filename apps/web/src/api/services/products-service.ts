import type { ProductDto } from '@stocker/core/dtos'
import type { Product } from '@stocker/core/entities'
import type { IApiClient, IProductsService } from '@stocker/core/interfaces'
import type { PaginationResponse } from '@stocker/core/responses'

export const ProductsService = (apiClient: IApiClient): IProductsService => {
  return {
    async registerProduct(product: Product) {
      return await apiClient.post('/', product.dto)
    },

    async getProduct(productId: string) {
      return await apiClient.get<ProductDto>(`/products/${productId}`)
    },

    async listProducts({ page }) {
      apiClient.setParam('page', String(page))
      return await apiClient.get<PaginationResponse<ProductDto>>('/products')
    },

    async updateProduct(partialProductDto: Partial<ProductDto>) {
      return await apiClient.put('/', partialProductDto)
    },

    async deleteProducts(productsIds: string[]) {
      return await apiClient.delete('/products', { productsIds })
    },
  }
}
