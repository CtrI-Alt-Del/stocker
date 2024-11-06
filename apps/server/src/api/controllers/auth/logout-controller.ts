import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

export class LogoutController {
  async handle(http: IHttp) {
    await http.destroyJwt()
    return http.send(null, HTTP_STATUS_CODE.ok)
  }
}
