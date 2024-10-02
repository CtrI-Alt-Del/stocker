import type { IProductsRepository } from '../../interfaces'

export class ReportStockLevelUseCase {
  private readonly productsRepository: IProductsRepository

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute() {
    const [safeproductscount, averageproductscount, dangerproductscount] =
      await Promise.all([
        this.productsRepository.countSafeStockLevel(),
        this.productsRepository.countAverageStockLevel(),
        this.productsRepository.countDangerStockLevel(),
      ])

    return {
      safe: safeproductscount,
      average: averageproductscount,
      danger: dangerproductscount,
    }
  }
}
