import { companiesRepository, usersRepository } from "@/database";
import { cryptoProvider } from "@/providers";
import { HTTP_STATUS_CODE } from "@stocker/core/constants";
import type { CompanyDto, UserDto } from "@stocker/core/dtos";
import type { IHttp } from "@stocker/core/interfaces";
import { SubscribeUseCase } from "@stocker/core/use-cases";

type Body = {
    userDto: UserDto,
    companyDto: CompanyDto
}

export class SubscribeController {
    async handle(http: IHttp) {
        const { userDto, companyDto } = http.getBody<Body>()
        const useCase = new SubscribeUseCase(usersRepository, companiesRepository, cryptoProvider)
        await useCase.execute({
            userDto, companyDto
        })

        const jwt = http.setJwt(userDto)
        return http.send(jwt, HTTP_STATUS_CODE.created)
    }
}