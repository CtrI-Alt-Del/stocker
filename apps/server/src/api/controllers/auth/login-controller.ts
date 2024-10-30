import { usersRepository } from "@/database";
import { cryptoProvider } from "@/providers";
import type { IHttp } from "@stocker/core/interfaces";
import { LoginUseCase } from "@stocker/core/use-cases";
import type { UserDto } from "@stocker/core/dtos";
import { HTTP_STATUS_CODE } from "@stocker/core/constants";


type Body = {
    email: string,
    password: string
}

export class LoginController {
    async handle(http: IHttp) {
      try {
        const { email, password } = http.getBody<Body>()
        const useCase = new LoginUseCase(usersRepository, cryptoProvider)
        const userDto = await useCase.execute({email, password})

        const jwt = http.setJwt(userDto)

        return http.send(jwt, HTTP_STATUS_CODE.ok)
      } catch (error) {
        return http.send(error, HTTP_STATUS_CODE.badRequest)
      }
    }
  }