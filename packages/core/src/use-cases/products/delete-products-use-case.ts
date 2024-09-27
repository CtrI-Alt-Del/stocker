import type { IFileStorageProvider, IProductsRepository } from '../../interfaces'

type Request = {
  productsIds: string[]
}

export class DeleteProductsUseCase {
  private readonly productsRepository: IProductsRepository
  private readonly fileStorageProvider: IFileStorageProvider

  constructor(
    productsRepository: IProductsRepository,
    fileStorageProvider: IFileStorageProvider,
  ) {
    this.productsRepository = productsRepository
    this.fileStorageProvider = fileStorageProvider
  }

  async execute({ productsIds }: Request) {
    for (const productId of productsIds) {
      const product = await this.productsRepository.findById(productId)
      if (!product) return

      if (product.hasImage) {
        await this.fileStorageProvider.delete(product.image)
      }
    }

    await this.productsRepository.deleteMany(productsIds)
  }
}
