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
import { VerifyJwtMiddleware, VerifyUserRoleMiddleware } from '@/api/middlewares'

export const ProductsRoutes = async (app: FastifyInstance) => {
  const getProductController = new GetProductController()
  const listProductController = new ListProductsController()
  const registerProductController = new RegisterProductController()
  const updateProductController = new UpdateProductController()
  const deleteProductsController = new DeleteProductsController()
  const verifyJwtMiddleware = new FastifyHandler(new VerifyJwtMiddleware())
  const verifyManagerRoleMiddleware = new FastifyHandler(
    new VerifyUserRoleMiddleware('manager'),
  )
  const verifyEmployeeRoleMiddleware = new FastifyHandler(
    new VerifyUserRoleMiddleware('employee'),
  )

  app.get(
    '/',
    {
      preHandler: [
        verifyJwtMiddleware.handle.bind(verifyJwtMiddleware),
        verifyEmployeeRoleMiddleware.handle.bind(verifyEmployeeRoleMiddleware),
      ],
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return listProductController.handle(http)
    },
  )

  app.get(
    '/:productId',
    {
      preHandler: [
        verifyJwtMiddleware.handle.bind(verifyJwtMiddleware),
        verifyEmployeeRoleMiddleware.handle.bind(verifyEmployeeRoleMiddleware),
      ],
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
        verifyManagerRoleMiddleware.handle.bind(verifyManagerRoleMiddleware),
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
        verifyManagerRoleMiddleware.handle.bind(verifyManagerRoleMiddleware),
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
        verifyManagerRoleMiddleware.handle.bind(verifyManagerRoleMiddleware),
      ],
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return deleteProductsController.handle(http)
    },
  )
}
