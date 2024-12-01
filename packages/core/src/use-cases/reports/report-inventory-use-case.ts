import type { IProductsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses'
import type { StockLevel } from '../../types'

type Request = {
  productName?: string
  companyId: string
  locationId?: string
  categoryId?: string
  stockLevel?: StockLevel
  supplierId?: string
  page: number
}

export class ReportInventorysUseCase {
  private readonly productsRepository: IProductsRepository
  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({
    page,
    companyId,
    productName,
    locationId,
    categoryId,
    stockLevel,
    supplierId,
  }: Request) {
    console.log({ productName, locationId, categoryId, stockLevel, supplierId })
    const { products, count } =
      await this.productsRepository.findManyWithInventoryMovementsCount({
        productName,
        companyId,
        locationId,
        categoryId,
        stockLevel,
        supplierId,
        page,
      })

    return new PaginationResponse({
      items: products.map((product) => product.dto),
      itemsCount: count,
    })
  }
}
