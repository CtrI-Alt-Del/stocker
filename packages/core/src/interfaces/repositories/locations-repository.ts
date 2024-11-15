import type { Location } from '../../domain/entities/location'
import type { PaginationResponse } from '../../responses'
import type { CategoriesListParams } from '../../types'

export interface ILocationsRepository {
  findById(locationId: string): Promise<Location | null>
  findMany(params: CategoriesListParams): Promise<PaginationResponse<Location>>
  add(location: Location): Promise<void>
  update(location: Location, locationId: string): Promise<void>
  deleteMany(locationsIds: string[]): Promise<void>
}
