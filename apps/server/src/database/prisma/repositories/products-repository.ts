import type { Product } from '@stocker/core/entities'
import type { IProductsRepository } from '@stocker/core/interfaces'

export class PrismaProductsRepository implements IProductsRepository {
  async add(product: Product): Promise<Product> {
    throw new Error('Method not implemented')
  }
}
