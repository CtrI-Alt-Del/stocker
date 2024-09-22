import type { ProductDto } from '@stocker/core/dtos'
import type { Product } from '@stocker/core/entities'
import type { IApiClient, IProductsService } from '@stocker/core/interfaces'
import type { PaginationResponse } from '@stocker/core/responses'

export const ProductsService = (apiClient: IApiClient): IProductsService => {
  return {
    async registerProduct(product: Product) {
      return await apiClient.post('/products', product.dto)
    },

    async getProduct(productId: string) {
      return await apiClient.get<ProductDto>(`/products/${productId}`)
    },

    async listProducts({ page }) {
      apiClient.setParam('page', String(page))
      return await apiClient.get<PaginationResponse<ProductDto>>('/products')
    },

    async updateProduct(partialProductDto: Partial<ProductDto>, productId: string) {
      return await apiClient.put(`/products/${productId}`, partialProductDto)
    },

    async deleteProducts(productsIds: string[]) {
      return await apiClient.delete('/products', { productsIds })
    },
  }
}
