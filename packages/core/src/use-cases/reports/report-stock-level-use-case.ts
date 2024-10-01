import { IProductsRepository } from "../../interfaces";

export class StockLevelReportUseCase {
  private readonly productsRepository: IProductsRepository

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute() {
    const safeproductscount = this.productsRepository.countSafeStockLevel()
    const averageproductscount = this.productsRepository.countAverageStockLevel()
    const dangerproductscount = this.productsRepository.countDangerStockLevel()

    return {
      safe: safeproductscount,
      average: averageproductscount,
      danger: dangerproductscount
    }
  }
}
