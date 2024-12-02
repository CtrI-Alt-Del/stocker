import { ConflictError } from '../../errors'
import { Supplier } from '../../domain/entities'
import type { SupplierDto } from '../../dtos'
import type { ISuppliersRepository } from '../../interfaces'

type Request = {
  supplierDto: SupplierDto
}
export class RegisterSupplierUseCase {
  private readonly suppliersRepository: ISuppliersRepository

  constructor(suppliersRepository: ISuppliersRepository) {
    this.suppliersRepository = suppliersRepository
  }

  async execute({ supplierDto }: Request) {
    const existingSupplier = await this.suppliersRepository.findByCnpj(supplierDto.cnpj)

    if (existingSupplier && existingSupplier.companyId === supplierDto.companyId) {
      throw new ConflictError('Fornecedor já cadastrado nessa empresa')
    }

    const supplier = Supplier.create(supplierDto)

    await this.suppliersRepository.add(supplier)
  }
}
