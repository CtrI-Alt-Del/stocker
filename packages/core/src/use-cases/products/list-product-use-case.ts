import type { IProductsRepository } from '../../interfaces'
import { NotFoundError } from '../../errors'

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
    if (!products) {
      throw new NotFoundError('Produtos não encontrados')
    }

    return products
  }
}
