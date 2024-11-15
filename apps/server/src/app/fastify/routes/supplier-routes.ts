import type { FastifyInstance } from 'fastify'

import {
  RegisterSupplierController,
  UpdateSupplierController,
} from '@/api/controllers/suppliers'
import { FastifyHttp } from '../fastify-http'
import { FastifyHandler } from '../fastify-handler'
import { VerifyJwtMiddleware, VerifyUserRoleMiddleware } from '@/api/middlewares'

export const SuppliersRoutes = async (app: FastifyInstance) => {
  const registerSupplierController = new RegisterSupplierController()
  const updateSupplierController = new UpdateSupplierController()
    const verifyJwtMiddleware = new FastifyHandler(new VerifyJwtMiddleware())
  const verifyAdminRoleMiddleware = new FastifyHandler(
    new VerifyUserRoleMiddleware('manager'),
  )
  const preHandlers = [verifyJwtMiddleware, verifyAdminRoleMiddleware].map((handler) =>
    handler.handle.bind(handler),
  )

  app.post('/', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerSupplierController.handle(http)
  })

  app.put('/:supplierId', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return updateSupplierController.handle(http)
  })
}
