import type { CompanyDto } from '@stocker/core/dtos'
import type { IApiClient, ICompaniesService } from '@stocker/core/interfaces'

export const CompaniesService = (apiClient: IApiClient): ICompaniesService => {
  return {
    async getCompany(companyId: string) {
      apiClient.clearParams()
      return await apiClient.get<CompanyDto>(`/companies/${companyId}`)
    },

    async getCompanyRoles(companyId: string) {
      return await apiClient.get<Array<{ name: string; permissions: string[] }>>(
        `/companies/${companyId}/roles`,
      )
    },

    async updateCompanyRole(role, companyId) {
      return await apiClient.put(`/companies/${companyId}/role`, {
        name: role.name,
        permissions: role.permissions,
        companyId,
      })
    },
  }
}
