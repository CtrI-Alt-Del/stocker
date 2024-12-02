import type { FastifyInstance } from 'fastify'

import {
  RegisterSupplierController,
  UpdateSupplierController,
  DeleteSuppliersController,
  ListSuppliersController,
  GetSupplierController,
} from '@/api/controllers/suppliers'
import { FastifyHttp } from '../fastify-http'
import { FastifyHandler } from '../fastify-handler'
import { VerifyJwtMiddleware, VerifyRolePermissionMiddleware } from '@/api/middlewares'

export const SuppliersRoutes = async (app: FastifyInstance) => {
  const registerSupplierController = new RegisterSupplierController()
  const updateSupplierController = new UpdateSupplierController()
  const deleteSupplierController = new DeleteSuppliersController()
  const listSuppliersController = new ListSuppliersController()
  const getSupplierController = new GetSupplierController()
  const verifyJwtMiddleware = new FastifyHandler(new VerifyJwtMiddleware())
  const verifyPermissionMiddleware = new FastifyHandler(
    new VerifyRolePermissionMiddleware('suppliers-control'),
  )
  const preHandlers = [verifyJwtMiddleware, verifyPermissionMiddleware].map((handler) =>
    handler.handle.bind(handler),
  )

  app.get(
    '/:supplierId',
    {
      preHandler: verifyJwtMiddleware.handle.bind(verifyJwtMiddleware),
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return listSuppliersController.handle(http)
    },
  )

  app.get(
    '/',
    {
      preHandler: verifyJwtMiddleware.handle.bind(verifyJwtMiddleware),
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return listSuppliersController.handle(http)
    },
  )

  app.post('/', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerSupplierController.handle(http)
  })

  app.put('/:supplierId', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return updateSupplierController.handle(http)
  })

  app.delete('/', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteSupplierController.handle(http)
  })
}
