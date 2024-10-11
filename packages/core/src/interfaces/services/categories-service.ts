import type { Category } from '../../domain/entities'
import type { BatchDto, CategoryDto } from '../../dtos'
import type { ApiResponse, PaginationResponse } from '../../responses'
import type { CategoriesListParams } from '../../types'

export interface ICategoriesService {
  listCategories(
    params: CategoriesListParams,
  ): Promise<ApiResponse<PaginationResponse<CategoryDto>>>
  getCategory(categoryId: string): Promise<ApiResponse<CategoryDto>>
  registerCategory(category: Category): Promise<ApiResponse<void>>
  updateCategory(
    partialCategoryDto: Partial<CategoryDto>,
    categoryId: string,
  ): Promise<ApiResponse<void>>
  updateBatch(batchDto: Partial<BatchDto>, batchId: string): Promise<ApiResponse<void>>
  deleteCategory(categorysIds: string[]): Promise<ApiResponse<void>>
}
