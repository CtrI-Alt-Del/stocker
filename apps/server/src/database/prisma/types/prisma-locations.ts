import type { Location } from '@prisma/client'

export type PrismaLocations = Location & {
    subLocation: Location[]
  }
