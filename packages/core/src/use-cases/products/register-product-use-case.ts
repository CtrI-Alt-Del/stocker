import { Product } from '../../domain/entities'
import type { ProductDto } from '../../dtos'
import type { IProductsRepository } from '../../interfaces'

type Request = {
  productDto: ProductDto
}

export class RegisterProductUseCase {
  private readonly productsRepository: IProductsRepository

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ productDto }: Request) {
    const product = Product.create(productDto)
    await this.productsRepository.add(product)
    return product.id
  }
}
