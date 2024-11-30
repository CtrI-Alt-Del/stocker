import type { Location } from '@prisma/client'

export type PrismaLocation = Location & {
    subLocation?: Location[]
  }
