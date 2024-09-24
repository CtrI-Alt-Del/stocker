import type { Product } from '../../domain/entities'
import type { ProducsStocksListParams, ProductsListParams } from '../../types'

export interface IProductsRepository {
  findById(productId: string): Promise<Product | null>
  findMany(params: ProductsListParams): Promise<Product[]>
  findManyWithInventoryMovements(
    params: ProducsStocksListParams,
  ): Promise<{ products: Product[]; count: number }>
  count(): Promise<number>
  countSafeStockLevel(): Promise<number>
  countAverageStockLevel(): Promise<number>
  countDangerStockLevel(): Promise<number>
  add(product: Product): Promise<void>
  update(product: Product): Promise<void>
  deleteMany(productId: string[]): Promise<void>
}
