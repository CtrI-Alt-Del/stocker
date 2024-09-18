import Fastify, { type FastifyInstance } from 'fastify'
import Cors from '@fastify/cors'
import Multipart from '@fastify/multipart'

import type { IServerApp } from '@stocker/core/interfaces'
import {
  AppError,
  AuthError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from '@stocker/core/errors'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { ENV } from '@/constants'
import { ProductsRoutes } from './routes/products-routes'

export class FastifyApp implements IServerApp {
  private readonly app: FastifyInstance

  constructor() {
    this.app = Fastify()

    this.app.register(Cors, { origin: '*' })
    this.app.register(Multipart)
    this.registerRoutes()
    this.setErrorHandler()
  }

  startServer() {
    this.app
      .listen({ port: ENV.port })
      .then(() => {
        console.log(`📟 Server running on port: http://localhost:${ENV.port}`)
      })
      .catch((error) => {
        console.error(`❌ Error on start server: ${error}`)
        process.exit(1)
      })
  }

  stopServer() {}

  private setErrorHandler() {
    this.app.setErrorHandler((error, _, reply) => {
      if (error instanceof AppError) {
        console.error('Error title:', error.title)
        console.error('Error message:', error.message)

        const response = {
          title: error.title,
          message: error.message,
        }

        error.statusCode

        if (error instanceof AuthError)
          return reply.status(HTTP_STATUS_CODE.unauthorized).send(response)

        if (error instanceof NotFoundError)
          return reply.status(HTTP_STATUS_CODE.notFound).send(response)

        if (error instanceof ConflictError)
          return reply.status(HTTP_STATUS_CODE.conflict).send(response)

        if (error instanceof ValidationError)
          return reply.status(HTTP_STATUS_CODE.badRequest).send(response)

        return reply.status(HTTP_STATUS_CODE.serverError).send(response)
      }

      console.error(error)

      return reply.status(HTTP_STATUS_CODE.serverError).send({
        title: 'Server Error',
        message: error.message,
      })
    })
  }

  private registerRoutes() {
    this.app.register(ProductsRoutes, { prefix: '/products' })
  }
}
