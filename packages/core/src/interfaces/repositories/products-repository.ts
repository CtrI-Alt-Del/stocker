import type { Product } from '../../domain/entities'

export interface IProductsRepository {
  findById(productId: string): Promise<Product | null>
  findMany(page: number): Promise<Product[]>
  count(): Promise<number>
  add(product: Product): Promise<void>
  update(product: Product): Promise<void>
  deleteMany(productId: string[]): Promise<void>
}
