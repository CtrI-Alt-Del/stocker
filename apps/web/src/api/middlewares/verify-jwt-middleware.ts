import { COOKIES, ROUTES } from '@/constants'
import type { IController, IHttp } from '@stocker/core/interfaces'

const PRIVATE_ROUTES = [
  '/',
  ROUTES.dashboard,
  ...Object.values(ROUTES.inventory),
  ...Object.values(ROUTES.records),
]

const DYNAMIC_PRIVATE_ROUTES = [ROUTES.inventory.productStock]

export const VerifyJwtMiddleware = (): IController => {
  return {
    async handle(http: IHttp) {
      const currentRoute = http.getCurrentRoute()

      const isPrivateRoute = PRIVATE_ROUTES.includes(currentRoute)
      let isDynamicPrivateRoute = false

      for (const route of DYNAMIC_PRIVATE_ROUTES) {
        const routeParamIndex = route.indexOf('/:routeParam')
        isDynamicPrivateRoute =
          currentRoute.slice(0, routeParamIndex) === route.slice(0, routeParamIndex)
        if (isDynamicPrivateRoute) break
      }

      if (isPrivateRoute || isDynamicPrivateRoute) {
        const jwt = http.getCookie<string>(COOKIES.jwt.key)
        if (!jwt) return http.redirect(ROUTES.login)
      }

      return http.pass()
    },
  }
}
