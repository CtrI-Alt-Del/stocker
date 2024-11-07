import type { CompanyDto } from '../../dtos'
import type { ApiResponse } from '../../responses'

export interface ICompaniesService {
  getCompany(companyId: string): Promise<ApiResponse<CompanyDto>>
}
