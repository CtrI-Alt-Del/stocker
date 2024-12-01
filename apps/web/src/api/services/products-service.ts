import type { BatchDto, ProductDto } from '@stocker/core/dtos'
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

    async listProducts({ page, name, categoryId, locationId }) {
      if (categoryId) apiClient.setParam('categoryId', categoryId)
      if (locationId) apiClient.setParam('locationId', locationId)
      if (name) apiClient.setParam('name', name)
      apiClient.setParam('page', String(page))
      return await apiClient.get<PaginationResponse<ProductDto>>('/products')
    },

    async updateProduct(partialProductDto: Partial<ProductDto>, productId: string) {
      return await apiClient.put(`/products/${productId}`, partialProductDto)
    },

    async updateBatch(batchDto: Partial<BatchDto>, batchId: string) {
      return await apiClient.put(`/products/batch/${batchId}`, batchDto)
    },

    async deleteProducts(productsIds: string[]) {
      return await apiClient.delete('/products', { productsIds })
    },
  }
}
