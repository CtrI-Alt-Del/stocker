import type { SupplierDto } from '../../dtos'
import type { ISuppliersRepository } from '../../interfaces'
import { ConflictError, NotFoundError } from '../../errors'

type Request = {
  supplierDto: Partial<SupplierDto>
  supplierId: string
}

export class UpdateSupplierUseCase {
  private readonly supplierRepository: ISuppliersRepository

  constructor(supplierRepository: ISuppliersRepository) {
    this.supplierRepository = supplierRepository
  }

  async execute({ supplierId, supplierDto }: Request) {
    const supplier = await this.supplierRepository.findById(supplierId)

    if (!supplier) {
      throw new NotFoundError('Fornecedor não encontrado')
    }

    if (supplierDto.cnpj) {
      const existingSupplier = await this.supplierRepository.findByCnpj(supplierDto.cnpj)

      if (
        existingSupplier &&
        existingSupplier.companyId === supplier.companyId &&
        existingSupplier.id !== supplierId
      ) {
        throw new ConflictError('Fornecedor com este CNPJ já cadastrado nesta empresa')
      }
    }

    const updatedSupplier = supplier.update(supplierDto)
    await this.supplierRepository.update(updatedSupplier, supplier.id)
  }
}
