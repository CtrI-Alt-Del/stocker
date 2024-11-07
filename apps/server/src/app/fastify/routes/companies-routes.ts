import type { FastifyInstance } from 'fastify'

import { FastifyHttp } from '../fastify-http'
import { FastifyHandler } from '../fastify-handler'
import { VerifyJwtMiddleware, VerifyUserRoleMiddleware } from '@/api/middlewares'
import { GetCompanyController } from '@/api/controllers/companies'

export const CompaniesRoutes = async (app: FastifyInstance) => {
  const getCompanyController = new GetCompanyController()
  const verifyJwtMiddleware = new FastifyHandler(new VerifyJwtMiddleware())
  const verifyAdminRoleMiddleware = new FastifyHandler(
    new VerifyUserRoleMiddleware('admin'),
  )
  const preHandlers = [verifyJwtMiddleware, verifyAdminRoleMiddleware].map((handler) =>
    handler.handle.bind(handler),
  )

  app.get('/:companyId', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return getCompanyController.handle(http)
  })
}
