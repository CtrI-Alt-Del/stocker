import type { FastifyReply, FastifyRequest } from 'fastify'

import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { IHttp } from '@stocker/core/interfaces'

export class FastifyHttp<Body = void, RouteParams = void, QueryParams = void>
  implements IHttp<Body, RouteParams, QueryParams>
{
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

  get body(): Body {
    return this.request.body as Body
  }

  get routeParams(): RouteParams {
    return this.request.params as RouteParams
  }

  get queryParams(): QueryParams {
    return this.request.query as QueryParams
  }
}
