import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { RegisterProductController } from '@/api/controllers/products'
import { ListProductController } from '@/api/controllers/products'

import { FastifyHttp } from '../fastify-http'

export const ProductsRoutes = async (app: FastifyInstance) => {
  const registerProductController = new RegisterProductController()
  const listProductController = new ListProductController()

  const router = app.withTypeProvider<ZodTypeProvider>()

  router.get('/', async (request, reply) => {
    const http = new FastifyHttp(request, reply)
    return registerProductController.handle(http)
  })
  router.delete('/:productId', async (request, reply) => {
    const http = new FastifyHttp(request, reply)
    return registerProductController.handle(http)
  })
}
