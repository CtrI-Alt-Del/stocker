import { Location } from '@stocker/core/entities'
import type { PrismaLocation } from '../types'

export class PrismaLocationsMapper {
  toDomain(prismaLocation: PrismaLocation): Location {
    const location = Location.create({
      id: prismaLocation.id,
      name: prismaLocation.name,
      parentLocationId: prismaLocation.parent_location_id ?? undefined,
      companyId: prismaLocation.company_id,
      subLocations: [],
    })

    if (prismaLocation.subLocation) {
      location.subLocations = prismaLocation.subLocation.map((subLocation) =>
        this.toDomain(subLocation),
      )
    }

    return location
  }

  toPrisma(location: Location): PrismaLocation {
    const locationDto = location.dto

    return {
      id: location.id,
      name: location.name,
      parent_location_id: locationDto.parentLocationId || null,
      company_id: locationDto.companyId,
      registered_at: new Date(),
      subLocation: [],
    }
  }
}
