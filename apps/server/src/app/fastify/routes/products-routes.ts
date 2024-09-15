import type { FastifyInstance } from 'fastify'

import { RegisterProductController } from '@/api/controllers/products'
import { ListProductController } from '@/api/controllers/products'

import { FastifyHttp } from '../fastify-http'
import { DeleteProductsController } from '@/api/controllers/products/delete-products-controller'

export const ProductsRoutes = async (app: FastifyInstance) => {
  const registerProductController = new RegisterProductController()
  const listProductController = new ListProductController()
  const deleteProductController = new DeleteProductsController()

  app.get('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listProductController.handle(http)
  })

  app.post('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerProductController.handle(http)
  })

  app.delete('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteProductController.handle(http)
  })
}
