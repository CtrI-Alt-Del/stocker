import { PAGINATION } from '../../../src/constants'
import type { InventoryMovement, Product } from '../../../src/domain/entities'
import type { IProductsRepository } from '../../../src/interfaces'
import { Datetime } from '../../../src/libs'
import type {
  ProductsListParams,
  ProducsStocksListParams,
  MostTrendingProductsListParams,
} from '../../../src/types'

export class ProductsRepositoryMock implements IProductsRepository {
  products: Product[] = []
  inventoryMovements: InventoryMovement[] = []

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

  async findManyWithInventoryMovementsCount({ page }: ProducsStocksListParams) {
    const allProducts = this.products

    let products = this.products.map((product) => {
      const inboundInventoryMovementsCount = this.inventoryMovements.reduce(
        (total, inventoryMovement) => {
          if (inventoryMovement.product.id === product.id) {
            return total + 1
          }
          return total
        },
        0,
      )
      const outboundInventoryMovementsCount = this.inventoryMovements.reduce(
        (total, inventoryMovement) => {
          if (inventoryMovement.product.id === product.id) {
            return total + 1
          }
          return total
        },
        0,
      )
      product.inboundInventoryMovementsCount = inboundInventoryMovementsCount
      product.outboundInventoryMovementsCount = outboundInventoryMovementsCount
      return product
    })

    if (page) {
      const startIndex = (page - 1) * PAGINATION.itemsPerPage
      products = products.slice(startIndex, startIndex + PAGINATION.itemsPerPage)
    }

    return {
      products,
      count: allProducts.length,
    }
  }

  async findOrderByInventoryMovementsCount({
    page,
    startDate,
    endDate,
    categoryId,
  }: MostTrendingProductsListParams) {
    let products = this.products
    let inventoryMovements = this.inventoryMovements

    if (page) {
      const startIndex = (page - 1) * PAGINATION.itemsPerPage
      products = this.products.slice(startIndex, startIndex + PAGINATION.itemsPerPage)
    }

    if (startDate && endDate) {
      inventoryMovements = this.inventoryMovements.filter((movement) => {
        const registeredAt = new Datetime(movement.registeredAt)
        return (
          movement.movementType === 'outbound' &&
          registeredAt.isBetween(startDate, endDate)
        )
      })
    }

    if (categoryId) {
      products = products.filter((product) => product.categoryId === categoryId)
    }

    const inventoryMovementsProductsIds = inventoryMovements.map(
      (movement) => movement.product.id,
    )

    products = products.filter((product) =>
      inventoryMovementsProductsIds.includes(product.id),
    )

    products.sort((productA, productB) => {
      const productACount = inventoryMovements.reduce((total, inventoryMovement) => {
        if (inventoryMovement.product.id === productA.id) {
          return total + 1
        }
        return total
      }, 0)
      const productBCount = inventoryMovements.reduce((total, inventoryMovement) => {
        if (inventoryMovement.product.id === productB.id) {
          return total + 1
        }
        return total
      }, 0)

      return productBCount - productACount
    })

    return {
      products,
      count: products.length,
    }
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
}
