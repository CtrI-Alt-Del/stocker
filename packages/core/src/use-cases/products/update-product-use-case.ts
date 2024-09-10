import type { ProductDto } from '#dtos'
import type { IProductsRepository } from '#interfaces/repositories'
import { NotFoundError } from '#errors'

type Request = {
  productDto: Partial<ProductDto>
  productId: string
}

export class UpdateProductUseCase {
  private readonly productsRepository: IProductsRepository
  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ productId, productDto }: Request) {
    const product = await this.productsRepository.findById(productId)
    if (!product) {
      throw new NotFoundError('Produto não encontrado')
    }
    const updatedProduct = product.update(productDto)
    await this.productsRepository.update(updatedProduct)
  }
}
