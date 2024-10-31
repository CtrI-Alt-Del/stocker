import { DeleteCompanyController } from '@/api/controllers/companies'
import type { FastifyInstance } from 'fastify'
import { FastifyHttp } from '../fastify-http'

export const CompaniesRoutes = async (app: FastifyInstance) => {
  const deleteCompanyController = new DeleteCompanyController()

  app.delete('/companyId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteCompanyController.handle(http)
  })
}
