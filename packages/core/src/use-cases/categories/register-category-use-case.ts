import type { Category } from '../../domain/entities/category'
import type { RegisterCategoryDTO } from '../../dtos/category-dto'
import type { ICategoriesRepository } from '../../interfaces/repositories/categories-repository'

export class RegisterCategoryUseCase {
  private readonly categoryRepository: ICategoriesRepository

  constructor(categoryRepository: ICategoriesRepository) {
    this.categoryRepository = categoryRepository
  }

  async execute(data: RegisterCategoryDTO): Promise<Category> {
    const category = new Category.create(data)
    const savedCategory = await this.categoryRepository.add(category)
    return savedCategory
  }
}
