import type { CompanyDto } from '../../dtos'
import type { ApiResponse } from '../../responses'

export interface ICompaniesService {
  getCompany(companyId: string): Promise<ApiResponse<CompanyDto>>
  getCompanyRoles(
    companyId: string,
  ): Promise<ApiResponse<{ name: string; permissions: string[] }[]>>
  updateCompanyRole(params: {
    companyId: string
    name: string
    permissions: string[]
  }): Promise<ApiResponse<{ name: string; permissions: string[] }>>
}
