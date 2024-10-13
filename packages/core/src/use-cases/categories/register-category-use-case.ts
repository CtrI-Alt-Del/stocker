import { Category } from '../../domain/entities/category'
import type { CategoryDto } from '../../dtos'
import { ConflictError } from '../../errors'
import type { ICategoriesRepository } from '../../interfaces/repositories/categories-repository'

type Request = {
  categoryDto: CategoryDto
}

export class RegisterCategoryUseCase {
  private readonly categoryRepository: ICategoriesRepository

  constructor(categoryRepository: ICategoriesRepository) {
    this.categoryRepository = categoryRepository
  }

  async execute({ categoryDto }: Request) {
    const category = Category.create(categoryDto)
    await this.categoryRepository.add(category)
    return category.id
  }
}
