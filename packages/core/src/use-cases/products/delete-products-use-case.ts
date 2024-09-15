import type { IProductsRepository } from '#interfaces/repositories'

type Request = {
  productsIds: string[]
}

export class DeleteProductsUseCase {
  private readonly productsRepository: IProductsRepository

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ productsIds }: Request) {
    await this.productsRepository.deleteMany(productsIds)
  }
}
