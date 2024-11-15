import type { Location } from "../../domain/entities";
import type { LocationDto } from "../../dtos/location-dto";
import type { ApiResponse, PaginationResponse } from "../../responses";
import type { LocationsListParams } from "../../types/locations-list-params";

export interface ILocationsService{
  listLocations(params:LocationsListParams): Promise<ApiResponse<PaginationResponse<LocationDto>>>
  getLocation(locationId:string): Promise<ApiResponse<LocationDto>>
  registerLocation(location:Location): Promise<ApiResponse<void>>
  updateLocation(partialLocationDto:Partial<LocationDto>,locationId:string): Promise<ApiResponse<void>>
  deleteLocation(locationId:string): Promise<ApiResponse<void>>
}
