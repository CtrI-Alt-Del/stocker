import { COOKIES, ENV } from '@/constants'
import { cryptoProvider } from '@/providers'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { IHttp } from '@stocker/core/interfaces'
import { RequestPasswordResetUseCase } from '@stocker/core/use-cases'

type Body = {
  email: string
}

export const RequestPasswordResetController = () => {
  return {
    async handle(http: IHttp) {
      const { email } = http.getBody<Body>()

      // const useCase = new RequestPasswordResetUseCase(cryptoProvider)
      // const confirmationToken = await useCase.execute(email, ENV.passwordResetSecret)

      // http.setCookie(
      //   confirmationToken,
      //   COOKIES.passwordResetToken.key,
      //   COOKIES.passwordResetToken.duration,
      // )

      // return http.send(null, HTTP_STATUS_CODE.ok)
    },
  }
}
