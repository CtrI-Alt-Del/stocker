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
      throw new NotFoundError('Usuário não encontrado')
    }

    const supplierEmail = supplierDto.email
      ? await this.supplierRepository.findByEmail(supplierDto.email)
      : null

    if (supplierEmail && supplierEmail.id !== supplierId) {
      throw new ConflictError('Esse Email já está em uso')
    }

    const supplierCNPJ = supplierDto.cnpj
      ? await this.supplierRepository.findByCnpj(supplierDto.cnpj)
      : null

    if (supplierCNPJ && supplierCNPJ.id !== supplierId) {
      throw new ConflictError('Esse CNPJ já está em uso')
    }

    const supplierPhone = supplierDto.phone
      ? await this.supplierRepository.findByPhone(supplierDto.phone)
      : null

    if (supplierPhone && supplierPhone.id !== supplierId) {
      throw new ConflictError('Esse telefone já está em uso')
    }

    const updatedSupplier = supplier.update(supplierDto)
    await this.supplierRepository.update(updatedSupplier, supplier.id)
  }
}
