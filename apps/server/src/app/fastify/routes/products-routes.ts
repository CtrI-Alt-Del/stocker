import type { FastifyInstance } from 'fastify'

import {
  DeleteProductsController,
  GetProductController,
  ListProductsController,
  RegisterProductController,
  UpdateProductController,
} from '@/api/controllers/products'
import { FastifyHttp } from '../fastify-http'
import { FastifyHandler } from '../fastify-handler'
import { VerifyJwtMiddleware, VerifyRolePermissionMiddleware } from '@/api/middlewares'

export const ProductsRoutes = async (app: FastifyInstance) => {
  const getProductController = new GetProductController()
  const listProductController = new ListProductsController()
  const registerProductController = new RegisterProductController()
  const updateProductController = new UpdateProductController()
  const deleteProductsController = new DeleteProductsController()
  const verifyJwtMiddleware = new FastifyHandler(new VerifyJwtMiddleware())
  const verifyRolePermissionMiddleware = new FastifyHandler(
    new VerifyRolePermissionMiddleware('products-control'),
  )

  app.get(
    '/',
    {
      preHandler: verifyJwtMiddleware.handle.bind(verifyJwtMiddleware),
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return listProductController.handle(http)
    },
  )

  app.get(
    '/:productId',
    {
      preHandler: verifyJwtMiddleware.handle.bind(verifyJwtMiddleware),
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return getProductController.handle(http)
    },
  )

  app.post(
    '/',
    {
      preHandler: [
        verifyJwtMiddleware.handle.bind(verifyJwtMiddleware),
        verifyRolePermissionMiddleware.handle.bind(verifyRolePermissionMiddleware),
      ],
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return registerProductController.handle(http)
    },
  )

  app.put(
    '/:productId',
    {
      preHandler: [
        verifyJwtMiddleware.handle.bind(verifyJwtMiddleware),
        verifyRolePermissionMiddleware.handle.bind(verifyRolePermissionMiddleware),
      ],
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return updateProductController.handle(http)
    },
  )

  app.delete(
    '/',
    {
      preHandler: [
        verifyJwtMiddleware.handle.bind(verifyJwtMiddleware),
        verifyRolePermissionMiddleware.handle.bind(verifyRolePermissionMiddleware),
      ],
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return deleteProductsController.handle(http)
    },
  )
}
