import type { Category } from '../../domain/entities/category'

export interface ICategoriesRepository {
  add(category: Category): Promise<void>
}
