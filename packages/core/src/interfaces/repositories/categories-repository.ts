import type { Category } from '../../domain/entities'
import type { CategoriesListParams } from '../../types'

export interface ICategoriesRepository {
  findById(categoryId: string): Promise<Category | null>
  findMany(
    params: CategoriesListParams,
  ): Promise<{ categories: Category[]; count: number }>
  add(category: Category): Promise<void>
  addMany(suppliers: Category[]): Promise<void>
  count(): Promise<number>
  update(category: Category): Promise<void>
  deleteById(categoryId: string): Promise<void>
}
