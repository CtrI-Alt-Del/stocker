import type { Supplier } from '../../domain/entities'
import type { SupplierDto } from '../../dtos'
import type { ApiResponse, PaginationResponse } from '../../responses'
import type { SuppliersListParams } from '../../types'

export interface ISuppliersService {
  listSuppliers(
    params: SuppliersListParams,
  ): Promise<ApiResponse<PaginationResponse<SupplierDto>>>
  getSupplier(SupplierId: string): Promise<ApiResponse<SupplierDto>>
  registerSupplier(Supplier: Supplier): Promise<ApiResponse<void>>
  updateSupplier(
    partialSupplierDto: Partial<SupplierDto>,
    SupplierId: string,
  ): Promise<ApiResponse<void>>
  deleteSuppliers(SuppliersIds: string[]): Promise<ApiResponse<void>>
}
