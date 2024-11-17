import type { FastifyInstance } from 'fastify'

import {
  RegisterSupplierController,
  ListSuppliersController,
} from '@/api/controllers/suppliers'
import { FastifyHttp } from '../fastify-http'
import { FastifyHandler } from '../fastify-handler'
import { VerifyJwtMiddleware, VerifyUserRoleMiddleware } from '@/api/middlewares'

export const SuppliersRoutes = async (app: FastifyInstance) => {
  const registerSupplierController = new RegisterSupplierController()
  const listSuppliersController = new ListSuppliersController()
  const verifyJwtMiddleware = new FastifyHandler(new VerifyJwtMiddleware())
  const verifyAdminRoleMiddleware = new FastifyHandler(
    new VerifyUserRoleMiddleware('admin'),
  )
  const preHandlers = [verifyJwtMiddleware, verifyAdminRoleMiddleware].map((handler) =>
    handler.handle.bind(handler),
  )

  app.post('/', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerSupplierController.handle(http)
  })

  app.get('/', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listSuppliersController.handle(http)
  })
}
