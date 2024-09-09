import type { Product } from '#domain/entities'
import type { ApiResponse } from '../../responses'

export interface IProductsService {
  registerProduct(product: Product): Promise<ApiResponse<void>>
}
