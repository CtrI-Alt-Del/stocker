import type { Product } from '#domain/entities'
import type { ProductDto } from '#dtos'
import type { ProductsListParams } from '#types'
import type { ApiResponse, PaginationResponse } from '#responses'

export interface IProductsService {
  listProducts(
    params: ProductsListParams,
  ): Promise<ApiResponse<PaginationResponse<ProductDto>>>
  getProduct(productId: string): Promise<ApiResponse<ProductDto>>
  registerProduct(product: Product): Promise<ApiResponse<void>>
  updateProduct(partialProductDto: Partial<ProductDto>): Promise<ApiResponse<void>>
  deleteProduct(productId: string): Promise<ApiResponse<void>>
}
