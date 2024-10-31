import { ROUTES } from '@/constants'
import { User } from '@stocker/core/entities'
import type { IController, IHttp } from '@stocker/core/interfaces'

export const RedirectByUserRoleMiddleware = (): IController => {
  return {
    async handle(http: IHttp) {
      const currentRoute = http.getCurrentRoute()

      if (currentRoute === '/') {
        let route = ''
        const user = User.create(await http.getUser())

        switch (user.role) {
          case 'admin':
            route = ROUTES.records.employees
            break
          case 'manager':
            route = ROUTES.dashboard
            break
          case 'employee':
            route = ROUTES.inventory.stocks
            break
          default:
            route = ROUTES.inventory.stocks
            break
        }
        return http.redirect(route)
      }

      return http.pass()
    },
  }
}
