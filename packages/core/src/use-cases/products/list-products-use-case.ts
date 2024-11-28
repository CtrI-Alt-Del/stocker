import type { IProductsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses'

type Request = {
  name?: string
  companyId: string
  locationId?: string
  categoryId?: string
  supplierId?: string
  page: number
}


export class ListProductsUseCase {
  private readonly productsRepository: IProductsRepository
  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ page, companyId, categoryId, name, locationId, supplierId }: Request) {
    const { products, count } =
      await this.productsRepository.findMany({
        name,
        companyId,
        locationId,
        categoryId,
        supplierId,
        page,
      })

    return new PaginationResponse({
      items: products.map((product) => product.dto),
      itemsCount: count,
    })
  }
}
