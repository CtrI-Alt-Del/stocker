import { COOKIES } from '@/constants'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { IAuthService, IHttp } from '@stocker/core/interfaces'

type Body = {
  email: string
}

export const RequestPasswordResetController = (authService: IAuthService) => {
  return {
    async handle(http: IHttp) {
      const { email } = http.getBody<Body>()

      const response = await authService.requestPasswordReset(email)

      if (response.isFailure) {
        return response.throwError()
      }

      http.setCookie(
        response.body.confirmationToken,
        COOKIES.passwordResetToken.key,
        COOKIES.passwordResetToken.duration,
      )

      return http.send(null, HTTP_STATUS_CODE.ok)
    },
  }
}
