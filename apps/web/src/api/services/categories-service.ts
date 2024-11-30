import type { BatchDto, CategoryDto } from '@stocker/core/dtos'
import type { Category } from '@stocker/core/entities'
import type { IApiClient, ICategoriesService } from '@stocker/core/interfaces'
import type { PaginationResponse } from '@stocker/core/responses'

export const CategoriesService = (apiClient: IApiClient): ICategoriesService => {
  return {
    async registerCategory(category: Category) {
      return await apiClient.post('/categories', category.dto)
    },

    async getCategory(categoryId: string) {
      return await apiClient.get<CategoryDto>(`/categories/${categoryId}`)
    },

    async listCategories({ page,name }) {
      apiClient.setParam('page', String(page))
      apiClient.setParam('name',String(name))
      return await apiClient.get<PaginationResponse<CategoryDto>>('/categories')
    },

    async updateCategory(partialCategoryDto: Partial<CategoryDto>, categoryId: string) {
      return await apiClient.put(`/categories/${categoryId}`, partialCategoryDto)
    },

    async updateBatch(batchDto: Partial<BatchDto>, batchId: string) {
      return await apiClient.put(`/categories/batch/${batchId}`, batchDto)
    },

    async deleteCategory(categoriesId: string) {
      return await apiClient.delete(`/categories/${categoriesId}`)
    },
  }
}
