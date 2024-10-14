import type { Category } from '../../domain/entities'
import type { CategoriesListParams } from '../../types'

export interface ICategoriesRepository {
  findById(categoryId: string): Promise<Category | null>
  findMany(params: CategoriesListParams): Promise<Category[]>
  add(category: Category): Promise<void>
  count(): Promise<number>
  update(category: Category): Promise<void>
  deleteMany(categoryIds: string[]): Promise<void>
}
