import type { Product } from '../../domain/entities'
import type { StockLevelReportDto } from '../../dtos/stock-level-report-dto'
import type { ProducsStocksListParams } from '../../types'

export interface IProductsRepository {
  findById(productId: string): Promise<Product | null>
  findMany(): Promise<Product[]>
  findManyWithInventoryMovements(params: ProducsStocksListParams): Promise<Product[]>
  count(): Promise<number>
  countStockLevel(): Promise<StockLevelReportDto>
  add(product: Product): Promise<void>
  update(product: Product): Promise<void>
  deleteMany(productId: string[]): Promise<void>
}
