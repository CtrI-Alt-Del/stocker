import { IProductsRepository } from "#interfaces/repositories";

type Request = {
    productId: string
}

export class DeleteProductUseCase {
    private readonly productsRepository: IProductsRepository

    constructor(productsRepository: IProductsRepository) {
        this.productsRepository = productsRepository
    }
    
    async execute({ productId }: Request) {
        await this.productsRepository.delete(productId)
    }
} 