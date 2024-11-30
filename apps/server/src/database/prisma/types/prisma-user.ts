import type { Role, User } from '@prisma/client'

export type PrismaUser = User & { role?: Role | null }
