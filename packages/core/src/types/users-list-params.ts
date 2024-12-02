import type { RoleName } from './role-name'

export type UsersListParams = {
  page: number
  companyId: string
  name?: string
  role?: RoleName
}
