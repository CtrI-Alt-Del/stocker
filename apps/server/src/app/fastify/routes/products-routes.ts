import type { FastifyInstance } from 'fastify'

import {
  DeleteProductsController,
  GetProductController,
  ListProductsController,
  RegisterProductController,
  UpdateProductController,
} from '@/api/controllers/products'
import { FastifyHttp } from '../fastify-http'

export const ProductsRoutes = async (app: FastifyInstance) => {
  const getProductController = new GetProductController()
  const listProductController = new ListProductsController()
  const registerProductController = new RegisterProductController()
  const updateProductController = new UpdateProductController()
  const deleteProductsController = new DeleteProductsController()

  app.get('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listProductController.handle(http)
  })

  app.get('/:productId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return getProductController.handle(http)
  })

  app.post('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerProductController.handle(http)
  })

  app.put('/:productId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return updateProductController.handle(http)
  })

  app.delete('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteProductsController.handle(http)
  })
}
