import type { Company } from '../../../src/domain/entities'
import type { Role } from '../../../src/domain/structs'
import type { ICompaniesRepository } from '../../../src/interfaces'

export class CompanyRepositoryMock implements ICompaniesRepository {
  companies: Company[] = []
  roles: Record<string, Role[]> = {}

  async add(company: Company): Promise<void> {
    this.companies.push(company)
  }

  async delete(companyId: string): Promise<void> {
    this.companies = this.companies.filter((company) => company.id !== companyId)
  }

  async findByCnpj(companyCnpj: string): Promise<Company | null> {
    const company = this.companies.find((company) => company.cnpj === companyCnpj) ?? null
    return company
  }

  async findById(companyId: string): Promise<Company | null> {
    const company = this.companies.find((company) => company.id === companyId) ?? null
    return company
  }

  async update(company: Company, companyId: string): Promise<Company> {
    throw new Error('Method not implemented.')
  }

  async addRole(role: Role, companyId: string): Promise<void> {
    if (!(companyId in this.roles)) {
      this.roles[companyId] = []
    }

    this.roles[companyId]?.push(role)
  }

  async findRolesById(companyId: string): Promise<Role[]> {
    return this.roles[companyId] ?? []
  }

  async findRoleById(roleName: string, companyId: string): Promise<Role | null> {
    console.log('roles', await this.findRolesById(companyId))
    return (
      (await this.findRolesById(companyId)).find((role) => role.name === roleName) ?? null
    )
  }

  async updateRole(role: Role, companyId: string): Promise<void> {
    this.roles[companyId] = [role]
  }
}
