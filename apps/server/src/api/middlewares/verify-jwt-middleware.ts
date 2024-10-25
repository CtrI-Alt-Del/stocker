import { NotAllowedError } from '@stocker/core/errors'
import type { IHttp } from '@stocker/core/interfaces'

export class VerifyJwtMiddleware {
  async handle(http: IHttp) {
    const isValidJwt = await http.verifyJwt()
    if (!isValidJwt) {
      throw new NotAllowedError('Acesso não permitido')
    }
    http.pass()
  }
}
