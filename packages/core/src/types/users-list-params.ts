import type { UserRole } from "./user-role"

export type UsersListParams = {
	page: number
	companyId: string
	name?: string
	role?: UserRole
}
