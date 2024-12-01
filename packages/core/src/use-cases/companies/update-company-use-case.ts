import type { CompanyDto } from '../../dtos'
import type { ICompaniesRepository } from '../../interfaces'
import { ConflictError, NotFoundError } from '../../errors'

type Request = {
  companyDto: Partial<CompanyDto>
  companyId: string
}

export class UpdateCompanyUseCase {
  private readonly companiesRepository: ICompaniesRepository
  constructor(companiesRepository: ICompaniesRepository) {
    this.companiesRepository = companiesRepository
  }

  async execute({ companyId, companyDto }: Request) {
    const company = await this.companiesRepository.findById(companyId)
    if (!company) throw new NotFoundError('Empresa não encontrada')

    if (companyDto.cnpj) {
      const company = await this.companiesRepository.findByCnpj(companyId)
      if (company) throw new ConflictError('CNPJ já em uso por outra empresa no sistema')
    }

    const updatedCompany = company.update(companyDto)
    await this.companiesRepository.update(updatedCompany, companyId)
  }
}
