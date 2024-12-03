import type { Supplier } from '../../../src/domain/entities'
import type { ISuppliersRepository } from '../../../src/interfaces'
import type { SuppliersListParams } from '../../../src/types'

export class SuppliersRepositoryMock implements ISuppliersRepository {
 
  suppliers: Supplier[] = []

  async findMany({ page }: SuppliersListParams): Promise<{ suppliers: Supplier[], count: number }> {
    const startIndex = (page - 1) * 10
    return {
      suppliers: this.suppliers.slice(startIndex, startIndex + 10),
      count: this.suppliers.length
    }
  }

  async findById(supplierId: string): Promise<Supplier | null> {
    const supplier = this.suppliers.find((supplier) => supplier.id === supplierId) ?? null
    return supplier
  }

  async findByEmail(supplierEmail: string): Promise<Supplier | null> {
    const email = this.suppliers.find((supplier) => supplier.email === supplierEmail) ?? null
    return email
  }

  async findByCnpj(supplierCnpj: string): Promise<Supplier | null> {
    const cnpj = this.suppliers.find((supplier) => supplier.cnpj === supplierCnpj) ?? null
    return cnpj
  }

  async findByPhone(supplierPhone: string): Promise<Supplier | null> {
    const phone = this.suppliers.find((supplier) => supplier.phone === supplierPhone) ?? null
    return phone
  }

  async add(supplier: Supplier): Promise<void> {
    this.suppliers.push(supplier)
  }

  async addMany(suppliers: Supplier[]): Promise<void> {
    for (const supplier of suppliers) this.add(supplier)
  }

  async update(supplier: Supplier): Promise<void> {
    this.suppliers = this.suppliers.map((existingSupplier) =>
      existingSupplier.id === supplier.id ? supplier : existingSupplier
    )
  }

  async deleteMany(supplierIds: string[]): Promise<void> {
    this.suppliers = this.suppliers.filter(
      (currentSupplier) => !supplierIds.includes(currentSupplier.id),
    )
  }
}
