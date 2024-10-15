import type { IProductsRepository } from '../../interfaces'
import { NotAllowedError, NotFoundError } from '../../errors'

type Request = {
  productId: string
}

export class GetProductUseCase {
  private readonly productsRepository: IProductsRepository
  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ productId }: Request) {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new NotFoundError('Produto não encontrado')
    }

    if (!product.isActive) {
      throw new NotAllowedError('Produto inativo')
    }

    return product.dto
  }
}
