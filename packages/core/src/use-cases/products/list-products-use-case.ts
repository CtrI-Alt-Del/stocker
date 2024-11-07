import type { IProductsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses'

type Request = {
  page: number
  companyId: string
}

export class ListProductsUseCase {
  private readonly productsRepository: IProductsRepository
  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ page,companyId }: Request) {
    const { products, count } = await this.productsRepository.findMany({ page,companyId })

    return new PaginationResponse({
      items: products.map((product) => product.dto),
      itemsCount: count,
    })
  }
}
