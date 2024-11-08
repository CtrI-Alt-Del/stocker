import type { ICategoriesRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses'

type Request = {
  page: number
  companyId: string
}

export class ListCategoryUseCase {
  private readonly categoriesRepository: ICategoriesRepository

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute({ page, companyId }: Request) {
    const categories = await this.categoriesRepository.findMany({ page, companyId })
    const categoriesCount = await this.categoriesRepository.count()

    return new PaginationResponse({
      items: categories.map((category) => category.dto),
      itemsCount: categoriesCount,
    })
  }
}
