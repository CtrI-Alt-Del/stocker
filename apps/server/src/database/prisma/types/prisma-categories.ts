import type { Category } from '@prisma/client'

export type PrismaCategory = Category & {
  subCategories: Category[]
}
