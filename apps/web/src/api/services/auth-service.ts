import type { IApiClient, IAuthService } from '@stocker/core/interfaces'
import type { UserDto, CompanyDto } from '@stocker/core/dtos'

export const AuthService = (apiClient: IApiClient): IAuthService => {
  return {
    async login(email: string, password: string) {
      return await apiClient.post<{ jwt: string }>('/auth/login', { email, password })
    },

    async resetPassword(email: string, password: string) {
      return await apiClient.patch<{ jwt: string }>('/auth/password', { email, password })
    },

    async subscribe(userDto: UserDto, companyDto: CompanyDto) {
      return await apiClient.post<{ jwt: string }>('/auth/subscribe', {
        user: userDto,
        company: companyDto,
      })
    },

    async logout() {
      return await apiClient.delete('/auth/logout')
    },

    async getPermissions() {
      return await apiClient.get<{ name: string; permissions: string[] }>(
        '/auth/permissions',
      )
    },

    async requestPasswordReset(email: string) {
      return await apiClient.post('/auth/password', { email })
    },

    async updateAccount(userDto: Partial<UserDto>, companyDto: Partial<CompanyDto>) {
      return await apiClient.put<{ jwt?: string }>('/auth/account', {
        user: userDto,
        company: companyDto,
      })
    },

    async deleteAccount() {
      return await apiClient.delete('/auth/account')
    },

    async confirmAuth(password: string) {
      return await apiClient.post('/auth/confirm', { password })
    },
  }
}
