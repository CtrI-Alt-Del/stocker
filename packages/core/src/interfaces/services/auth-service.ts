import type { CompanyDto, UserDto } from '../../dtos'
import type { ApiResponse } from '../../responses'

export interface IAuthService {
  login(email: string, password: string): Promise<ApiResponse<{ jwt: string }>>
  resetPassword(email: string, password: string): Promise<ApiResponse<{ jwt: string }>>
  confirmAuth(password: string): Promise<ApiResponse<boolean>>
  subscribe(
    userDto: UserDto,
    companyDto: CompanyDto,
  ): Promise<ApiResponse<{ jwt: string }>>
  logout(): Promise<ApiResponse>
  getPermissions(): Promise<ApiResponse<string[]>>
  requestPasswordReset(email: string): Promise<ApiResponse<{ confirmationToken: string }>>
  updateAccount(
    userDto: Partial<UserDto>,
    companyDto: Partial<CompanyDto>,
  ): Promise<ApiResponse<{ jwt?: string }>>
  deleteAccount(): Promise<ApiResponse>
}
