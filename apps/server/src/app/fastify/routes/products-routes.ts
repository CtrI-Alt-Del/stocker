import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { RegisterProductController } from '@/api/controllers/products'
import { ListProductController } from '@/api/controllers/products'

import { FastifyHttp } from '../fastify-http'
import { DeleteProductController } from '@/api/controllers/products/delete-product-controller'

export const ProductsRoutes = async (app: FastifyInstance) => {
  const registerProductController = new RegisterProductController()
  const listProductController = new ListProductController()

  const router = app.withTypeProvider<ZodTypeProvider>()

  router.get('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerProductController.handle(http)
  })

  router.get('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listProductController.handle(http)
  })

  const deleteProductController = new DeleteProductController()

  router.delete('/:productId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteProductController.handle(http)
  })

}
