export type UserDto = {
  id?: string
  role: {
    name: string
    permissions: string[]
  }
  email: string
  name: string
  companyId: string
  hasFirstPasswordReset?: boolean
  password?: string
}
