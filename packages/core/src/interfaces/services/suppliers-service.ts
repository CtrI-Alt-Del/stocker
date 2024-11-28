import type { Supplier } from '../../domain/entities'
import type { SupplierDto } from '../../dtos'
import type { ApiResponse, PaginationResponse } from '../../responses'
import type { SuppliersListParams } from '../../types'

export interface ISuppliersService {
  listSuppliers(params: SuppliersListParams): Promise<ApiResponse<PaginationResponse<SupplierDto>>>
  getSupplier(supplierId: string): Promise<ApiResponse<SupplierDto>>
  registerSupplier(supplier: Supplier): Promise<ApiResponse<void>>
  updateSupplier(partialSupplierDto: Partial<SupplierDto>, supplierId: string): Promise<ApiResponse<void>>
  deleteSupplier(suppliersIds: string[]): Promise<ApiResponse<void>>
}
