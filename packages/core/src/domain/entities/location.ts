import type { LocationDto } from '../../dtos/location-dto'
import { Entity } from '../abstracts'

export type LocationProps = {
  name: string
  parentLocationId?: string
  companyId: string
  subLocations: Location[]
}

export class Location extends Entity<LocationProps> {
  static create(dto: LocationDto): Location {
    return new Location(
      {
        name: dto.name,
        parentLocationId: dto.parentLocationId,
        companyId: dto.companyId,
        subLocations: dto.subLocations.map(Location.create),
      },
      dto.id,
    )
  }

  get hasParentLocation(): boolean {
    return Boolean(this.props.parentLocationId)
  }

  get name(): string {
    return this.props.name
  }

  get subLocations(): Location[] {
    return this.props.subLocations
  }

  get dto(): LocationDto {
    return {
      id: this.id,
      name: this.props.name,
      parentLocationId: this.props.parentLocationId,
      companyId: this.props.companyId,
      subLocations: this.props.subLocations.map((subLocation) => subLocation.dto),
    }
  }

  update(partialDto: Partial<LocationDto>): Location {
    return Location.create({ ...this.dto, ...partialDto })
  }
}
