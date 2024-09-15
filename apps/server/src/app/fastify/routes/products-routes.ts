import type { FastifyInstance } from 'fastify'

import { RegisterProductController } from '@/api/controllers/products'
import { ListProductController } from '@/api/controllers/products'

import { FastifyHttp } from '../fastify-http'
import { DeleteProductsController } from '@/api/controllers/products/delete-products-controller'
import { GetProductController } from '@/api/controllers/products/get-product-controller'
import { UpdateProductController } from '@/api/controllers/products/update-product-controller'

export const ProductsRoutes = async (app: FastifyInstance) => {
  const getProductController = new GetProductController()
  const listProductController = new ListProductController()
  const registerProductController = new RegisterProductController()
  const updateProductController = new UpdateProductController()
  const deleteProductController = new DeleteProductsController()

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
    return deleteProductController.handle(http)
  })
}
