import type { IProductsRepository } from '../../interfaces'
import { PaginationResponse } from '#responses'

type Request = {
  page: number
}

export class ListProductsUseCase {
  private readonly productsRepository: IProductsRepository
  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ page }: Request) {
    const products = await this.productsRepository.findMany(page)

    const productsCount = await this.productsRepository.count()

    return new PaginationResponse({
      items: products.map((product) => product.dto),
      itemsCount: productsCount,
    })
  }
}
