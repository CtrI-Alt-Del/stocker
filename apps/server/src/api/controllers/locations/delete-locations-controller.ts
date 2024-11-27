import type { LocationDto } from "@stocker/core/dtos";
import type { IHttp } from "@stocker/core/interfaces";
import { DeleteLocationsUseCase } from '@stocker/core/use-cases'
import { locationsRepository } from "@/database";
import { HTTP_STATUS_CODE } from "@stocker/core/constants";

type Body = {
    locationsId: string[]
  }

export class DeleteLocationsController {
    async handle(http: IHttp) {
        const locationsId = http.getBody<Body>()
        const useCase = new DeleteLocationsUseCase(locationsRepository)
        await useCase.execute(locationsId)
    
        return http.send(null, HTTP_STATUS_CODE.ok)
    }
}