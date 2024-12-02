export type UserDto = {
  id?: string
  email: string
  name: string
  companyId: string
  role: string
  hasFirstPasswordReset?: boolean
  password?: string
}
