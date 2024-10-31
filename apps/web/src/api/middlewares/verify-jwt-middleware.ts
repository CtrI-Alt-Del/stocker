import { COOKIES, ROUTES } from '@/constants'
import type { IController, IHttp } from '@stocker/core/interfaces'

const PRIVATE_ROUTES = [
  ROUTES.dashboard,
  Object.values(ROUTES.inventory),
  Object.values(ROUTES.records),
]

export const VerifyJwtMiddleware = (): IController => {
  return {
    async handle(http: IHttp) {
      const currentRoute = http.getCurrentRoute()

      const isPrivateRoute = PRIVATE_ROUTES.includes(currentRoute)

      if (isPrivateRoute) {
        const jwt = http.getCookie<string>(COOKIES.jwt.key)
        if (!jwt) return http.redirect(ROUTES.login)
      }

      return http.pass()
    },
  }
}
