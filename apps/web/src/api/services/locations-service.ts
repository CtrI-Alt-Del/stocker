import type { IApiClient,ILocationsService } from '@stocker/core/interfaces'
import type { Location } from '@stocker/core/entities'
import type { LocationDto } from '@stocker/core/dtos'
import type { PaginationResponse } from '@stocker/core/responses'
export const LocationsService = (apiClient: IApiClient): ILocationsService => {
  return {
    async registerLocation(location: Location) {
      return await apiClient.post('/locations', location.dto)
    },
    async getLocation(locationId: string) {
        return await apiClient.get<LocationDto>(`/locations/${locationId}`)
    },
    async listLocations({page,name}){
      apiClient.setParam('name',String(name))
      apiClient.setParam('page',String(page))
      return await apiClient.get<PaginationResponse<LocationDto>>('/locations')
    },
    async updateLocation(partialLocationDto: Partial<LocationDto>, locationId:string) {
        return await apiClient.put(`/locations/${locationId}`, partialLocationDto)
    },
    async deleteLocation(locationId:string) {
        return await apiClient.delete(`/locations/${locationId}`)
    },
  }
}
