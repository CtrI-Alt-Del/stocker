import type { Role, RolePermission } from '@prisma/client'

export type PrismaRole = Role & { permissions: RolePermission[] }
