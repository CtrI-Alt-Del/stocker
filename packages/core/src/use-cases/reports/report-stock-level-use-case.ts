import type { IProductsRepository } from '../../interfaces'

type Request = {
  companyId: string
}
export class ReportStockLevelUseCase {
  private readonly productsRepository: IProductsRepository

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ companyId }: Request) {
    const [safeProductsCount, averageProductsCount, dangerProductsCount] =
      await Promise.all([
        this.productsRepository.countSafeStockLevel(companyId),
        this.productsRepository.countAverageStockLevel(companyId),
        this.productsRepository.countDangerStockLevel(companyId),
      ])

    return {
      safe: safeProductsCount,
      average: averageProductsCount,
      danger: dangerProductsCount,
    }
  }
}
