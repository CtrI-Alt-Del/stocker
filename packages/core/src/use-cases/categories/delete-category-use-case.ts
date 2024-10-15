import type { ICategoriesRepository } from '../../interfaces'

type Request = {
    categoryId: string
}

export class DeleteCategoryUseCase {
  private readonly categoriesRepository: ICategoriesRepository

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute({ categoryId }: Request) {
    await this.categoriesRepository.deleteById(categoryId)
  }
}
