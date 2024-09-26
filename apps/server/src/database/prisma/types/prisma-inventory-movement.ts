import type { InventoryMovement } from '@prisma/client'

export type PrismaInventoryMovement = InventoryMovement & {
  User?: { name: string }
  Product?: { name: string }
}
