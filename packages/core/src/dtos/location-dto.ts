export type LocationDto = {
  id?: string
  name: string
  parentLocationId?: string
  companyId: string
  subLocations: LocationDto[]
}
