import type { Product } from '../../domain/entities'
import { StockLevelReportDto } from '../../dtos/stock-level-report-dto'

export interface IProductsRepository {
  findById(productId: string): Promise<Product | null>
  findMany(page: number): Promise<Product[]>
  findManyWithInventory(page: number): Promise<Product[]>
  count(): Promise<number>
  countStockLevel(): Promise<StockLevelReportDto>
  add(product: Product): Promise<void>
  update(product: Product): Promise<void>
  deleteMany(productId: string[]): Promise<void>
}
