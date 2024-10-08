import type { ICsvProvider, IProductsRepository } from '../../interfaces'
import { Datetime } from '../../libs'
import { ValidationError } from '../../errors'
import { PaginationResponse } from '../../responses'

type Request = {
  startDate?: Date
  endDate?: Date
  page: number
}

export class ReportMostTrendingProductsUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute({ startDate, endDate, page }: Request) {
    if (startDate && endDate && new Datetime(startDate).isGreaterThan(endDate)) {
      throw new ValidationError('Data de início não pode ser maior que a data final')
    }

    if (!startDate || !endDate) {
      const now = new Date()
      startDate = new Datetime(now).subtractDays(7)
      endDate = now
    }

    const { products, count } =
      await this.productsRepository.findOrderByInventoryMovementsCount({
        startDate,
        endDate,
        page,
      })

    return new PaginationResponse({
      items: products.map((product) => product.dto),
      itemsCount: count,
    })
  }
}
