import type { InventoryMovement } from '@prisma/client'
import type { PrismaProduct } from './prisma-product'
import type { PrismaUser } from './prisma-clients'

export type PrismaInventoryMovement = InventoryMovement & {
  User?: PrismaUser
  Product?: PrismaProduct
}
