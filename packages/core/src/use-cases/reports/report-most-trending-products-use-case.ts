import type { IProductsRepository } from '../../interfaces'
import { Datetime } from '../../libs'
import { ValidationError } from '../../errors'

type Request = {
  startDate?: Date
  endDate?: Date
}

export class ReportMostTrendingProductsUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute({ startDate, endDate }: Request) {
    console.log(startDate)
    console.log(endDate)
    if (startDate && endDate && new Datetime(startDate).isGreaterThan(endDate)) {
      throw new ValidationError('Data de início não pode ser maior que a data final')
    }

    if (!startDate || !endDate) {
      const now = new Date()
      startDate = new Datetime(now).subtractDays(7)
      endDate = now
    }

    const products = await this.productsRepository.findOrderByInventoryMovementsCount({
      startDate,
      endDate,
    })

    return products.map((product) => product.dto)
  }
}
