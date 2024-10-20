import { NotFoundError } from '../../errors'
import type { ICategoriesRepository } from '../../interfaces'

export class GetCategoryUseCase {
  private readonly categoriesRepository: ICategoriesRepository

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute(categoryId: string) {
    const category = await this.categoriesRepository.findById(categoryId)

    if (!category) {
      throw new NotFoundError('Categoria não encontrada')
    }

    return category.dto
  }
}
