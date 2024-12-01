import type { FastifyInstance } from 'fastify'

import { FastifyHttp } from '../fastify-http'
import { FastifyHandler } from '../fastify-handler'
import { VerifyJwtMiddleware, VerifyRolePermissionMiddleware } from '@/api/middlewares'
import {
  GetCompanyController,
  GetCompanyRolesController,
  UpdateCompanyRoleController,
} from '@/api/controllers/companies'

export const CompaniesRoutes = async (app: FastifyInstance) => {
  const getCompanyController = new GetCompanyController()
  const getCompanyRolesController = new GetCompanyRolesController()
  const updateCompanyRoleController = new UpdateCompanyRoleController()
  const verifyJwtMiddleware = new FastifyHandler(new VerifyJwtMiddleware())
  const verifyAdminRoleMiddleware = new FastifyHandler(
    new VerifyRolePermissionMiddleware('all'),
  )
  const preHandlers = [verifyJwtMiddleware, verifyAdminRoleMiddleware].map((handler) =>
    handler.handle.bind(handler),
  )

  app.get('/:companyId', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return getCompanyController.handle(http)
  })

  app.get('/:companyId/roles', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return getCompanyRolesController.handle(http)
  })

  app.put('/:companyId/role', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return updateCompanyRoleController.handle(http)
  })
}
