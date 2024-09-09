import type { IHttp } from '@stocker/core/interfaces'

export class RegisterProductController {
  async handle(http: IHttp) {
    return http.send({ message: 'Rota de produtos' })
  }
}
