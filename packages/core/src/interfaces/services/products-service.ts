import type { Product } from '../../domain/entities'
import type { BatchDto, ProductDto } from '../../dtos'
import type { ApiResponse, PaginationResponse } from '../../responses'
import type { ProductsListParams } from '../../types'

export interface IProductsService {
  listProducts(
    params: ProductsListParams,
  ): Promise<ApiResponse<PaginationResponse<ProductDto>>>
  getProduct(productId: string): Promise<ApiResponse<ProductDto>>
  registerProduct(product: Product): Promise<ApiResponse<void>>
  updateProduct(
    partialProductDto: Partial<ProductDto>,
    productId: string,
  ): Promise<ApiResponse<void>>
  updateBatch(batchDto: Partial<BatchDto>, batchId: string): Promise<ApiResponse<void>>
  deleteProducts(productsIds: string[]): Promise<ApiResponse<void>>
}
