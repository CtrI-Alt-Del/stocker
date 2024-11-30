import type { Location } from '../../domain/entities/location'
import type { PaginationResponse } from '../../responses'
import type { LocationsListParams } from '../../types'

export interface ILocationsRepository {
  findById(locationId: string): Promise<Location | null>
  findByName(locationName: string): Promise<Location | null>
  findMany(params: LocationsListParams): Promise<PaginationResponse<Location>>
  count(): Promise<number>
  add(location: Location): Promise<void>
  update(location: Location, locationId: string): Promise<void>
  deleteMany(locationsIds: string[]): Promise<void>
  deleteById(locationId: string): Promise<void>
}
