import type { FastifyInstance } from 'fastify'

import {
  DeleteProductsController,
  GetProductController,
  ListProductsController,
  ListProductsStocksController,
  RegisterProductController,
  UpdateBatchController,
  UpdateProductController,
} from '@/api/controllers/products'
import { FastifyHttp } from '../fastify-http'

export const ProductsRoutes = async (app: FastifyInstance) => {
  const getProductController = new GetProductController()
  const listProductStocksController = new ListProductsStocksController()
  const listProductController = new ListProductsController()
  const registerProductController = new RegisterProductController()
  const updateProductController = new UpdateProductController()
  const updateBatchController = new UpdateBatchController()
  const deleteProductController = new DeleteProductsController()

  app.get('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listProductController.handle(http)
  })

  app.get('/:productId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return getProductController.handle(http)
  })

  app.get('/stocks', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listProductStocksController.handle(http)
  })

  app.post('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerProductController.handle(http)
  })

  app.put('/:productId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return updateProductController.handle(http)
  })

  app.put('/batch/:batchId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return updateBatchController.handle(http)
  })

  app.delete('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteProductController.handle(http)
  })
}
