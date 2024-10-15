import { PAGINATION } from '../../../src/constants'
import type { Product } from '../../../src/domain/entities'
import type { IProductsRepository } from '../../../src/interfaces'
import type { ProductsListParams, ProducsStocksListParams } from '../../../src/types'

export class ProductsRepositoryMock implements IProductsRepository {
  products: Product[] = []

  async findById(productId: string): Promise<Product | null> {
    return this.products.find((product) => product.id === productId) ?? null
  }

  async findMany({
    page,
  }: ProductsListParams): Promise<{ products: Product[]; count: number }> {
    const startIndex = (page - 1) * PAGINATION.itemsPerPage
    return {
      products: this.products.slice(startIndex, startIndex + PAGINATION.itemsPerPage),
      count: this.products.length,
    }
  }

  findManyWithInventoryMovementsCount(
    params: ProducsStocksListParams,
  ): Promise<{ products: Product[]; count: number }> {
    throw new Error('Method not implemented.')
  }
  count(): Promise<number> {
    throw new Error('Method not implemented.')
  }
  countSafeStockLevel(): Promise<number> {
    throw new Error('Method not implemented.')
  }
  countAverageStockLevel(): Promise<number> {
    throw new Error('Method not implemented.')
  }
  countDangerStockLevel(): Promise<number> {
    throw new Error('Method not implemented.')
  }

  async add(product: Product): Promise<void> {
    this.products.push(product)
  }

  async update(product: Product): Promise<void> {
    this.products = this.products.map((currentProduct) =>
      currentProduct.id === product.id ? product : currentProduct,
    )
  }

  async deleteMany(productIds: string[]): Promise<void> {
    this.products = this.products.filter(
      (currentProduct) => !productIds.includes(currentProduct.id),
    )
  }

  findOrderByInventoryMovementsCount(params: {
    page?: number
    startDate: Date
    endDate: Date
  }): Promise<{ products: Product[]; count: number }> {
    throw new Error('Method not implemented.')
  }
}
