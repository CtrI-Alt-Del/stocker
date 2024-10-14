import type { ICategoriesRepository } from '../../interfaces'

type Request = {
    categoryIds: string[]
}

export class DeleteCategoryUseCase {
  private readonly categoriesRepository: ICategoriesRepository

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute({ categoryIds }: Request) {
    await this.categoriesRepository.deleteMany(categoryIds)
  }
}
