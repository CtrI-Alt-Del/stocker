import type { CompanyDto, UserDto } from '@stocker/core/dtos'
import type { User } from '@stocker/core/entities'

export type AuthContextValue = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  subscribe: (userDto: UserDto, companyDto: CompanyDto) => Promise<void>
  logout: () => Promise<void>
}