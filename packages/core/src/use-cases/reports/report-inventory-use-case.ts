import type { IProductsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses'
import type { StockLevel } from '../../types'

type Request = {
  name?: string
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

  async execute({ page, companyId, name, locationId, categoryId, stockLevel, supplierId }: Request) {
    const { products, count } =
      await this.productsRepository.findManyWithInventoryMovementsCount({
        name,
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
