import Fastify, { type FastifyInstance } from 'fastify'

import type { IServerApp } from '@stocker/core/interfaces'
import { ENV } from '../../constants'
import { ProductsRoutes } from './routes/products-routes'

export class FastifyApp implements IServerApp {
  private readonly app: FastifyInstance

  constructor() {
    this.app = Fastify()

    this.registerRoutes()
  }

  startServer() {
    this.app
      .listen({ port: ENV.port })
      .then(() => {
        console.log(`📟 Server running on port: ${ENV.port}`)
      })
      .catch((error) => {
        console.error(`❌ Error on start server: ${error}`)
        process.exit(1)
      })
  }

  stopServer() {}

  private registerRoutes() {
    this.app.register(ProductsRoutes, { prefix: '/products' })
  }
}
