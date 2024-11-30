import type { Category } from '../../../src/domain/entities'
import { NotFoundError } from '../../../src/errors'
import type { ICategoriesRepository } from '../../../src/interfaces'
import type { CategoriesListParams } from '../../../src/types'

export class CategoriesRepositoryMock implements ICategoriesRepository {
  categories: Category[] = []

  async findById(categoryId: string): Promise<Category | null> {
    const category = this.categories.find((cat) => cat.id === categoryId) ?? null
    return category
  }

  async findMany({
    page,
  }: CategoriesListParams): Promise<{ categories: Category[]; count: number }> {
    const startIndex = (page - 1) * 10
    return {
      categories: this.categories.slice(startIndex, startIndex + 10),
      count: this.categories.length,
    }
  }

  async addMany(categories: Category[]): Promise<void> {
    this.categories.push(...categories)
  }

  async add(category: Category): Promise<void> {
    this.categories.push(category)
  }

  async count(): Promise<number> {
    return this.categories.length
  }

  async update(category: Category): Promise<void> {
    this.categories = this.categories.map((existingCategory) =>
      existingCategory.id === category.id ? category : existingCategory,
    )
  }

  async deleteById(categoryId: string): Promise<void> {
    const categoryToDelete = this.categories.find((cat) => cat.id === categoryId)

    if (!categoryToDelete) {
      throw new NotFoundError()
    }
    const subCategoryIds = categoryToDelete.dto.subCategories.map((subCat) => subCat.id)
    if (subCategoryIds) {
      this.categories = this.categories.filter((cat) => {
        return !subCategoryIds.includes(cat.id)
      })
    }

    this.categories = this.categories.filter((cat) => cat.id !== categoryId)
  }
}
