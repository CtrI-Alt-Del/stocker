import { companiesRepository } from '@/database'
import { NotAllowedError } from '@stocker/core/errors'
import type { IHttp } from '@stocker/core/interfaces'

export class VerifyJwtMiddleware {
  async handle(http: IHttp) {
    const isValidJwt = await http.verifyJwt()
    if (!isValidJwt) {
      throw new NotAllowedError('Acesso não permitido')
    }

    const user = await http.getUser()
    const company = await companiesRepository.findById(user.companyId)
    if (!company) {
      throw new NotAllowedError('Empresa não encontrada')
    }

    return http.pass()
  }
}
