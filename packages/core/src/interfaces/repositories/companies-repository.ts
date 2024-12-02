import type { Company } from '../../domain/entities'
import type { Role } from '../../domain/structs'

export interface ICompaniesRepository {
  add(company: Company): Promise<void>
  addRole(role: Role, companyId: string): Promise<void>
  findById(companyId: string): Promise<Company | null>
  findRolesById(companyId: string): Promise<Role[]>
  findRoleById(roleName: string, companyId: string): Promise<Role | null>
  findByCnpj(companyCnpj: string): Promise<Company | null>
  update(company: Company, companyId: string): Promise<Company>
  updateRole(role: Role, companyId: string): Promise<void>
  delete(companyId: string): Promise<void>
}
