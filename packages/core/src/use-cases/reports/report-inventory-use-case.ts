import type { IProductsRepository } from '../../interfaces'

type Request = {
  page: number
}

export class ReportInventorysUseCase {
  private readonly productsRepository: IProductsRepository
  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ page }: Request) {
    const { products, count } =
      await this.productsRepository.findManyWithInventoryMovementsCount({ page })

    return {
      items: products.map((product) => product.dto),
      totalCount: count,
    }
  }
}
