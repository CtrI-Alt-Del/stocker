import type { Product } from '#domain/entities'

export interface IProductsRepository {
  add(product: Product): Promise<Product>;
  delete(idProduct: string): Promise<void>; 
}
