import type { LocationDto } from "@stocker/core/dtos";
import type { IHttp } from "@stocker/core/interfaces";
import { RegisterLocationUseCase } from '@stocker/core/use-cases'
import { locationsRepository } from "@/database";
import { HTTP_STATUS_CODE } from "@stocker/core/constants";

export class RegisterLocationController {
    async handle(http: IHttp) {
        const locationDto = http.getBody<LocationDto>()
        const useCase = new RegisterLocationUseCase(locationsRepository)
        const {companyId} = await http.getUser()

        await useCase.execute({ locationDto, companyId })
    
        return http.send(null, HTTP_STATUS_CODE.created)
    }
}