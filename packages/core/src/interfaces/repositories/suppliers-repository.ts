import type { Supplier } from '../../domain/entities/supplier'
import type { SuppliersListParams } from '../../types'

export interface ISuppliersRepository {
  findMany(params: SuppliersListParams): Promise<{ suppliers: Supplier[], count: number }>
  findByEmail(email: string): Promise<Supplier | null>
  findByCnpj(cnpj: string): Promise<Supplier | null>
  findByPhone(phone: string): Promise<Supplier | null>
  add(supplier: Supplier): Promise<void>
  update(supplier: Supplier, supplierId: string): Promise<void>
  deleteMany(suppliersIds: string[]): Promise<void>
}
