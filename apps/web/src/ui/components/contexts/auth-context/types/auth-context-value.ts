import type { CompanyDto, UserDto } from '@stocker/core/dtos'
import type { Company, User } from '@stocker/core/entities'

export type AuthContextValue = {
  user: User | null
  company: Company | null
  jwt: string | null
  login: (email: string, password: string) => Promise<void>
  subscribe: (userDto: UserDto, companyDto: CompanyDto) => Promise<void>
  logout: () => Promise<void>
  updateAccount: (
    userDto: Partial<UserDto>,
    companyDto: Partial<CompanyDto>,
  ) => Promise<void>
  deleteAccount: () => Promise<void>
  confirmAuth: (password: string) => Promise<boolean>
  resetPassword: (email: string, password: string) => Promise<void>
}
