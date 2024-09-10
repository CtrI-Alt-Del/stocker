import { ProductDto } from "#dtos"
import { Product } from "#domain/entities"
import { IProductsRepository } from "../../interfaces/repositories/products-repository"

type Request = {
  productDto: Partial<ProductDto>
  productId: string
}

export class UpdateProductUseCase {
  private readonly productsRepository: IProductsRepository
  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }
  
  async execute({productId, productDto}: Request) {
    const product = await this.productsRepository.findById(productId)
    if (!product) {
      throw new Error('Produto não encontrado')
    }
    product.update(productDto)
    await this.productsRepository.update(product)
  }
}
