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
import { VerifyJwtMiddleware, VerifyUserRoleMiddleware } from '@/api/middlewares'

export const SuppliersRoutes = async (app: FastifyInstance) => {
  const registerSupplierController = new RegisterSupplierController()
  const updateSupplierController = new UpdateSupplierController()
  const deleteSupplierController = new DeleteSuppliersController()
  const listSuppliersController = new ListSuppliersController()
  const getSupplierController = new GetSupplierController()
  const verifyJwtMiddleware = new FastifyHandler(new VerifyJwtMiddleware())
  const verifyManagerRoleMiddleware = new FastifyHandler(
    new VerifyUserRoleMiddleware('manager'),
  )
  const verifyEmployeeRoleMiddleware = new FastifyHandler(
    new VerifyUserRoleMiddleware('employee'),
  )
  const preHandlersManager = [verifyJwtMiddleware, verifyManagerRoleMiddleware].map(
    (handler) => handler.handle.bind(handler),
  )
  const preHandlersEmployee = [verifyJwtMiddleware, verifyEmployeeRoleMiddleware].map(
    (handler) => handler.handle.bind(handler),
  )

  app.get(
    '/:supplierId',
    {
      preHandler: preHandlersEmployee,
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return listSuppliersController.handle(http)
    },
  )

  app.get(
    '/',
    {
      preHandler: preHandlersEmployee,
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return listSuppliersController.handle(http)
    },
  )

  app.post('/', { preHandler: preHandlersManager }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerSupplierController.handle(http)
  })

  app.put(
    '/:supplierId',
    { preHandler: preHandlersManager },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return updateSupplierController.handle(http)
    },
  )

  app.delete('/', { preHandler: preHandlersManager }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteSupplierController.handle(http)
  })
}
