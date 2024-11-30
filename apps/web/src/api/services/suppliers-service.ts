import type { IApiClient, ISuppliersService } from '@stocker/core/interfaces'
import type { Supplier } from '@stocker/core/entities'
import type { SupplierDto } from '@stocker/core/dtos'
import type { PaginationResponse } from '@stocker/core/responses'

export const SuppliersService = (apiClient: IApiClient): ISuppliersService => {
  return {
    async registerSupplier(supplier: Supplier) {
      return await apiClient.post('/suppliers', supplier.dto)
    },

    async getSupplier(supplierId: string) {
      return await apiClient.get<SupplierDto>(`/suppliers/${supplierId}`)
    },

    async listSuppliers({ page = 1, name }) {
      apiClient.setParam('page', String(page))
      if (name) apiClient.setParam('name', String(name))
      return await apiClient.get<PaginationResponse<SupplierDto>>('/suppliers')
    },

    async updateSupplier(partialSupplierDto: Partial<SupplierDto>, supplierId: string) {
      return await apiClient.put(`/suppliers/${supplierId}`, partialSupplierDto)
    },

    async deleteSupplier(suppliersIds: string[]) {
      return await apiClient.delete('/suppliers', { suppliersIds })
    },
  }
}
