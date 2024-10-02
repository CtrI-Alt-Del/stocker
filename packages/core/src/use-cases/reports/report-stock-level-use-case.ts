import type { IProductsRepository } from '../../interfaces'

export class ReportStockLevelUseCase {
  private readonly productsRepository: IProductsRepository

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute() {
    const safeproductscount = await this.productsRepository.countSafeStockLevel()
    const averageproductscount = await this.productsRepository.countAverageStockLevel()
    const dangerproductscount = await this.productsRepository.countDangerStockLevel()

    console.log(safeproductscount)

    return {
      safe: safeproductscount,
      average: averageproductscount,
      danger: dangerproductscount,
    }
  }
}
