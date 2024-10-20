import type { IProductsRepository } from '../../interfaces'

export class ReportStockLevelUseCase {
  private readonly productsRepository: IProductsRepository

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute() {
    const [safeProductsCount, averageProductsCount, dangerProductsCount] =
      await Promise.all([
        this.productsRepository.countSafeStockLevel(),
        this.productsRepository.countAverageStockLevel(),
        this.productsRepository.countDangerStockLevel(),
      ])

    return {
      safe: safeProductsCount,
      average: averageProductsCount,
      danger: dangerProductsCount,
    }
  }
}
