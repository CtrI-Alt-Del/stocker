import type { Supplier } from '../../domain/entities/supplier'
import type { SuppliersListParams } from '../../types'

export interface ISuppliersRepository {
  findById(supplierId: string): Promise<Supplier | null>
  findByPhone(phone: string | undefined): Promise<Supplier | null>
  findMany(params: SuppliersListParams): Promise<{ suppliers: Supplier[]; count: number }>
  findById(userId: string): Promise<Supplier | null>
  findByEmail(email: string): Promise<Supplier | null>
  findByCnpj(cnpj: string | undefined): Promise<Supplier | null>
  add(supplier: Supplier): Promise<void>
  addMany(suppliers: Supplier[]): Promise<void>
  update(supplier: Supplier, supplierId: string): Promise<void>
  deleteMany(suppliersIds: string[]): Promise<void>
}
