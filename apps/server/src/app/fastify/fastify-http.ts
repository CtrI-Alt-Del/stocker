import type { FastifyReply, FastifyRequest } from 'fastify'

import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { IHttp } from '@stocker/core/interfaces'
import type { UserDto } from '@stocker/core/dtos'
import { ValidationError } from '@stocker/core/errors'

import { MAX_FILE_SIZE } from '@/constants'

export class FastifyHttp implements IHttp {
  constructor(
    private readonly request: FastifyRequest,
    private readonly reply: FastifyReply,
  ) {}

  async verifyJwt(): Promise<boolean> {
    try {
      await this.request.jwtVerify()
      return true
    } catch (error) {
      return false
    }
  }

  pass(): unknown {
    return
  }

  send(response: unknown, statusCode = HTTP_STATUS_CODE.ok) {
    return this.reply.status(statusCode).send(response)
  }

  redirect(route: string) {
    return this.reply.redirect(route)
  }

  async getUser() {
    await this.verifyJwt()
    return this.request.user as UserDto
  }

  setHeader(key: string, value: string): void {
    this.reply.header(key, value)
  }

  async setJwt(user: UserDto): Promise<string> {
    const jwt = await this.reply.jwtSign(user, {
      sub: user.id,
      expiresIn: '30 days',
    })

    return jwt
  }

  destroyJwt(): void {
    this.reply.clearCookie('access_token')
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
      throw new ValidationError('Arquivo não encontrado')
    }

    const buffer = await file.toBuffer()

    return buffer
  }

  async getImageFile(): Promise<Buffer> {
    const file = await this.request.file({ limits: { fileSize: MAX_FILE_SIZE } })

    if (!file) {
      throw new ValidationError('Arquivo não encontrado')
    }

    const imageMimeTypeRegex = /^(image\/(?:gif|jpg|jpeg|png))/i

    const isValidMimeType = imageMimeTypeRegex.test(file.mimetype)

    if (!isValidMimeType) {
      throw new ValidationError('Arquivo não é uma imagem')
    }

    const buffer = await file.toBuffer()

    return buffer
  }
}
