import { Location } from '@stocker/core/entities'
import type { PrismaLocation } from '../types'

export class PrismaLocationsMapper {
  toDomain(prismaLocation: PrismaLocation): Location {
    return Location.create({
      id: prismaLocation.id,
      name: prismaLocation.name,
      parentLocationId: prismaLocation.parent_location_id ?? undefined,
      companyId: prismaLocation.company_id,
      subLocations: prismaLocation.subLocation.map((subLocation) => ({
        id: subLocation.id,
      name: subLocation.name,
      companyId: subLocation.company_id,
      parentLocationId: subLocation.parent_location_id ?? undefined,
      subLocations: [],
      }))
    });
  }
  
  toPrisma(location: Location): PrismaLocation {
    const locationDto = location.dto;
  
    return {
      id: location.id,
      name: location.name,
      parent_location_id: locationDto.parentLocationId || null,
      company_id: locationDto.companyId,
      registered_at: new Date(),
      subLocation: []
    };
  }
  
}  
