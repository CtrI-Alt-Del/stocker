import type { FastifyInstance } from 'fastify'

import {
  DeleteCategoryController,
  ListCategoryController,
  RegisterCategoryController,
  UpdateCategoryController,
  GetCategoryController,
} from '@/api/controllers/categories'
import { VerifyJwtMiddleware, VerifyUserRoleMiddleware } from '@/api/middlewares'
import { FastifyHttp } from '../fastify-http'
import { FastifyHandler } from '../fastify-handler'

export const CategoriesRoutes = async (app: FastifyInstance) => {
  const registerCategoryController = new RegisterCategoryController()
  const getCategoryController = new GetCategoryController()
  const listCategoryController = new ListCategoryController()
  const deleteCategoryController = new DeleteCategoryController()
  const updateCategoryController = new UpdateCategoryController()
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
      return listCategoryController.handle(http)
    },
  )

  app.get(
    '/:categoryId',
    {
      preHandler: [
        verifyJwtMiddleware.handle.bind(verifyJwtMiddleware),
        verifyEmployeeRoleMiddleware.handle.bind(verifyEmployeeRoleMiddleware),
      ],
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return getCategoryController.handle(http)
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
      return registerCategoryController.handle(http)
    },
  )
  app.put(
    '/:categoryId',
    {
      preHandler: [
        verifyJwtMiddleware.handle.bind(verifyJwtMiddleware),
        verifyManagerRoleMiddleware.handle.bind(verifyManagerRoleMiddleware),
      ],
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return updateCategoryController.handle(http)
    },
  )

  app.delete(
    '/:categoryId',
    {
      preHandler: [
        verifyJwtMiddleware.handle.bind(verifyJwtMiddleware),
        verifyManagerRoleMiddleware.handle.bind(verifyManagerRoleMiddleware),
      ],
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return deleteCategoryController.handle(http)
    },
  )
}
