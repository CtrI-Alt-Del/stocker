import type { Supplier } from '../../domain/entities/supplier'
import type { PaginationResponse } from '../../responses'
import type { SuppliersListParams } from '../../types'

export interface SuppliersRepository {
  findMany(params: SuppliersListParams): Promise<PaginationResponse<Supplier>>
  findByEmail(email: string): Promise<Supplier>
  findByCnpj(cnpj: string): Promise<Supplier>
  findByPhone(phone: string): Promise<Supplier>
  add(supplier: Supplier): Promise<void>
  update(supplier: Supplier, supplierId: string): Promise<void>
  deleteMany(suppliersIds: string[]): Promise<void>
}