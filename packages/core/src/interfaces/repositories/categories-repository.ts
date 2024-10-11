import type { Category } from '@prisma/client'
import type { CategoriesListParams } from '../../types'

export interface ICategoriesRepository {
  findById(categoryId: string): Promise<Category | null>
  findMany(params: CategoriesListParams): Promise<Category[]>
  add(category: Category): Promise<void>
  count(): Promise<number>
  update(category: Category): Promise<void>
  deleteById(categoryId: string): Promise<Category | null>
}
