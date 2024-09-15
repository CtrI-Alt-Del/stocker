import { Product } from '#domain/entities'
import type { ProductDto } from '#dtos'
import { ConflictError } from '#errors'
import type { IProductsRepository } from '#interfaces/repositories'

type Request = {
  productDto: ProductDto
}

export class RegisterProductUseCase {
  private readonly productsRepository: IProductsRepository

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ productDto }: Request) {
    if (productDto.id) {
      const product = await this.productsRepository.findById(productDto.id)
      if (product) throw new ConflictError('Produto já existente')
    }

    const product = Product.create(productDto)
    await this.productsRepository.add(product)
    return product.id
  }
}
