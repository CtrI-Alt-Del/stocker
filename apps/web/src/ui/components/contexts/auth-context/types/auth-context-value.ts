import type { CompanyDto, UserDto } from '@stocker/core/dtos'
import type { Company, User } from '@stocker/core/entities'

export type AuthContextValue = {
  resetPassword: (email: string, password: string) => Promise<void>
  user: User | null
  company: Company | null
  jwt: string | null
  login: (email: string, password: string) => Promise<void>
  subscribe: (userDto: UserDto, companyDto: CompanyDto) => Promise<void>
  logout: () => Promise<void>
  update: (userDto: Partial<UserDto>, companyDto: Partial<CompanyDto>) => Promise<void>
}
