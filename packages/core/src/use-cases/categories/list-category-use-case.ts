import type { ICategoriesRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses'

type Request = {
  page: number
  companyId: string
  name?: string
}

export class ListCategoryUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  async execute({ page, companyId, name }: Request) {
    const { categories, count } = await this.categoriesRepository.findMany({
      page,
      companyId,
      name,
    })

    return new PaginationResponse({
      items: categories.map((category) => category.dto),
      itemsCount: count,
    })
  }
}
