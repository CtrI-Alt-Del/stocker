import type { IProductsRepository } from '../../interfaces'
import type { Product } from '../../domain/entities'
import { Datetime } from '../../libs'
import { ValidationError } from '../../errors'

type Request = {
  startDate?: Date
  endDate?: Date
}

type Response = {
  products: Product[]
}

export class ReportMostTrendingProductsUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute({ startDate, endDate }: Request): Promise<Response> {
    if (startDate && endDate && new Datetime(startDate).isLessThan(endDate)) {
      throw new ValidationError('Data de início não pode ser menor que a data final')
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

    return { products }
  }
}
