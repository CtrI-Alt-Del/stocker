import type { Product } from '#domain/entities'

export interface IProductsRepository {
  findById(productId: string): Promise<Product>
  add(product: Product): Promise<Product>
  update(product: Product): Promise<void>
  delete(idProduct: string): Promise<void>
}
