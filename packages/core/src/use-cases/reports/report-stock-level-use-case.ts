import { IProductsRepository } from "../../interfaces";

export class ReportStockLevelUseCase {
  private readonly productsRepository: IProductsRepository

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute() {
    const safeproductscount = this.productsRepository.countSQLsafe()
    const averageproductscount = this.productsRepository.countSQLaverage()
    const dangerproductscount = this.productsRepository.countSQLdanger()

    return {
      safe: safeproductscount,
      average: averageproductscount,
      danger: dangerproductscount
    }
  }
}
