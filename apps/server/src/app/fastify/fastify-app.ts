import Fastify, { type FastifyInstance } from 'fastify'
import Multipart from '@fastify/multipart'
import Cors from '@fastify/cors'
import Cookies from '@fastify/cookie'
import nodeCron from 'node-cron'
import {
  ProductsRoutes,
  FileStorageRoutes,
  InventoryMovementsRoutes,
  ReportsRoutes,
  CategoriesRoutes,
  UsersRoutes,
  NotificationsRoutes,
  AuthRoutes,
  BatchesRoutes,
  CompaniesRoutes,
} from './routes'
import Jwt from '@fastify/jwt'

import type { IApp } from '@stocker/core/interfaces'
import {
  AppError,
  NotAllowedError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from '@stocker/core/errors'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { COOKIES, ENV } from '@/constants'
import { SendExpirationDateNotificationJob } from '@/jobs'

export class FastifyApp implements IApp {
  private readonly app: FastifyInstance

  constructor() {
    this.app = Fastify()
    this.app.register(Cors, { origin: '*' })
    this.app.register(Multipart)
    this.app.register(Jwt, {
      secret: ENV.jwtSecret,
      cookie: {
        cookieName: COOKIES.jwt.key,
        signed: true,
      },
      sign: {
        expiresIn: '1d',
      },
    })
    this.app.register(Cookies)

    this.setErrorHandler()
    this.registerRoutes()
    this.scheduleJobs()
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

        if (error instanceof NotAllowedError)
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

  private scheduleJobs() {
    const sendExpirationDateNotificationjob = new SendExpirationDateNotificationJob()

    // nodeCron.schedule(
    //   '* * * * * *',
    //   async () => await sendExpirationDateNotificationjob.handle(),
    // )
  }

  private registerRoutes() {
    this.app.register(AuthRoutes, { prefix: '/auth' })
    this.app.register(ProductsRoutes, { prefix: '/products' })
    this.app.register(BatchesRoutes, { prefix: '/batches' })
    this.app.register(CompaniesRoutes, { prefix: '/companies' })
    this.app.register(InventoryMovementsRoutes, { prefix: '/inventory-movements' })
    this.app.register(FileStorageRoutes, { prefix: '/file-storage' })
    this.app.register(ReportsRoutes, { prefix: '/reports' })
    this.app.register(CategoriesRoutes, { prefix: '/categories' })
    this.app.register(UsersRoutes, { prefix: '/users' })
    this.app.register(NotificationsRoutes, { prefix: '/notifications' })
  }
}
