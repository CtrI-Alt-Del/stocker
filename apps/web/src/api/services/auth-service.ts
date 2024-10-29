import type { IApiClient, IAuthService } from '@stocker/core/interfaces'
import type { UserDto, CompanyDto } from '@stocker/core/dtos'

export const AuthService = (apiClient: IApiClient): IAuthService => {
  return {
    async login(email: string, password: string) {
      return await apiClient.post<{ jwt: string }>('/auth/login', { email, password })
    },

    async subscribe(userDto: UserDto, companyDto: CompanyDto) {
      return await apiClient.post<{ jwt: string }>('/auth/subscribe', {
        user: userDto,
        company: companyDto,
      })
    },
  }
}
