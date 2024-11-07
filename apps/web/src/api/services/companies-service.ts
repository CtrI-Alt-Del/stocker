import type { CompanyDto } from '@stocker/core/dtos'
import type { IApiClient, ICompaniesService } from '@stocker/core/interfaces'

export const CompaniesService = (apiClient: IApiClient): ICompaniesService => {
  return {
    async getCompany(companyId: string) {
      apiClient.clearParams()
      return await apiClient.get<CompanyDto>(`/companies/${companyId}`)
    },
  }
}
