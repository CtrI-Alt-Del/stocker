import { usersRepository } from "@/database";
import { cryptoProvider } from "@/providers";
import type { IHttp } from "@stocker/core/interfaces";
import { ResetPasswordUseCase } from "@stocker/core/use-cases";
import { HTTP_STATUS_CODE } from "@stocker/core/constants";

type Body = {
    email: string
    newPassword: string
}
export class ResetPasswordController {
    async handle(http: IHttp) {
        const { email, newPassword } = http.getBody<Body>()
        const useCase = new ResetPasswordUseCase(usersRepository, cryptoProvider)

        await useCase.execute({ email, newPassword })
        return http.send(HTTP_STATUS_CODE.ok)
    }
}