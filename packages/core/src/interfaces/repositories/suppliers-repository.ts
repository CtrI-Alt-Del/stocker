import type { Supplier } from '../../domain/entities/supplier'
import type { PaginationResponse } from '../../responses'
import type { SuppliersListParams } from '../../types'

export interface ISuppliersRepository {
  findMany(params: SuppliersListParams): Promise<PaginationResponse<Supplier>>
  findById(supplierId: string): Promise<Supplier | null>
  findByEmail(email: string): Promise<Supplier>
  findByCnpj(cnpj: string | undefined): Promise<Supplier>
  findByPhone(phone: string | undefined): Promise<Supplier>
  add(supplier: Supplier): Promise<void>
  update(supplier: Supplier, supplierId: string): Promise<void>
  deleteMany(suppliersIds: string[]): Promise<void>
}
