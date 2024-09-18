import type { FastifyReply, FastifyRequest } from 'fastify'

import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { IHttp } from '@stocker/core/interfaces'
import { MAX_FILE_SIZE } from '@/constants'
import { ValidationError } from '@stocker/core/errors'

export class FastifyHttp implements IHttp {
  constructor(
    private readonly request: FastifyRequest,
    private readonly reply: FastifyReply,
  ) {}

  send(response: unknown, statusCode = HTTP_STATUS_CODE.ok) {
    return this.reply.status(statusCode).send(response)
  }

  redirect(route: string) {
    return this.reply.redirect(route)
  }

  getBody<Body>(): Body {
    return this.request.body as Body
  }

  getRouteParams<RouteParams>(): RouteParams {
    return this.request.params as RouteParams
  }

  getQueryParams<QueryParams>(): QueryParams {
    return this.request.query as QueryParams
  }

  async getFile(): Promise<Buffer> {
    const file = await this.request.file({ limits: { fileSize: MAX_FILE_SIZE } })

    if (!file) {
      throw new ValidationError('Tamanho máximo de arquivo excedido')
    }

    const buffer = await file.toBuffer()

    return buffer
  }
}
