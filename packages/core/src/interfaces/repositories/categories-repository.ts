import type { Category } from '@prisma/client'

export interface ICategoriesRepository {
  findById(categoryId: string): Promise<Category | null>
  findMany(): Promise<Category[]>
  count(): Promise<number>
  update(Category: Category): Promise<void>
  deleteById(CategoryId: string): Promise<Category | null>
}
