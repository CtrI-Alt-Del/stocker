import { usersRepository } from "@/database";
import { cryptoProvider } from "@/providers";
import type { IHttp } from "@stocker/core/interfaces";
import { ResetPasswordUseCase } from "@stocker/core/use-cases";
import { HTTP_STATUS_CODE } from "@stocker/core/constants";

type Body = {
  email: string
  password: string
}
export class ResetPasswordController {
  async handle(http: IHttp) {
    const { email, password } = http.getBody<Body>()
    const useCase = new ResetPasswordUseCase(usersRepository, cryptoProvider)

    await useCase.execute({ email, password })
    return http.send(null, HTTP_STATUS_CODE.ok)
  }
}