import type { IProductsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses'

type Request = {
  page: number
}

export class ListProductsUseCase {
  private readonly productsRepository: IProductsRepository
  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ page }: Request) {
    const { products, count } = await this.productsRepository.findMany({ page })

    return new PaginationResponse({
      items: products.map((product) => product.dto),
      itemsCount: count,
    })
  }
}
