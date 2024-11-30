import { locationsRepository } from "@/database"
import type { IHttp } from "@stocker/core/interfaces"
import { GetLocationUseCase } from "@stocker/core/use-cases"

type RouteParams = {
  locationId:string
}
export class GetLocationController{
  async handle(http:IHttp){
    const {locationId} = http.getRouteParams<RouteParams>()
    const useCase = new GetLocationUseCase(locationsRepository)
    const location = await useCase.execute(locationId)
    return http.send(location)
  }
}
