import { NotFoundError } from '../../errors'
import type { ICompaniesRepository } from '../../interfaces'

type Request = {
  companyId: string
  name: string
  permissions: string[]
}

export class UpdateCompanyRoleUseCase {
  private readonly companiesRepository: ICompaniesRepository

  constructor(companiesRepository: ICompaniesRepository) {
    this.companiesRepository = companiesRepository
  }

  async execute({ companyId, name, permissions }: Request) {
    const company = await this.companiesRepository.findById(companyId)
    if (!company) throw new NotFoundError('Empresa não encontrada')

    const role = await this.companiesRepository.findRoleById(name, companyId)
    if (!role) throw new NotFoundError('Cargo não encontrado')

    await this.companiesRepository.updateRole(
      role.updatePermissions(permissions),
      company.id,
    )

    return role
  }
}
