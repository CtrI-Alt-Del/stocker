import type { Product } from '@stocker/core/entities'
import type { IProductsRepository } from '@stocker/core/interfaces'

export class PrismaProductsRepository implements IProductsRepository {
  async add(product: Product): Promise<Product> {
    throw new Error('Method not implemented')
  }
  async findById(productId: string): Promise<Product> {
    throw new Error('Method not implemented.')
  }
  async findMany(page: number): Promise<Product[]> {
    throw new Error('Method not implemented.')
  }
  async count(): Promise<number> {
    throw new Error('Method not implemented.')
  }
  async update(product: Product): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async delete(idProduct: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
