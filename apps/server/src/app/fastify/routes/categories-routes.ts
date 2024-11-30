import type { FastifyInstance } from 'fastify'

import {
  DeleteCategoryController,
  ListCategoryController,
  RegisterCategoryController,
  UpdateCategoryController,
  GetCategoryController,
} from '@/api/controllers/categories'
import { VerifyJwtMiddleware, VerifyRolePermissionMiddleware } from '@/api/middlewares'
import { FastifyHttp } from '../fastify-http'
import { FastifyHandler } from '../fastify-handler'

export const CategoriesRoutes = async (app: FastifyInstance) => {
  const registerCategoryController = new RegisterCategoryController()
  const getCategoryController = new GetCategoryController()
  const listCategoryController = new ListCategoryController()
  const deleteCategoryController = new DeleteCategoryController()
  const updateCategoryController = new UpdateCategoryController()
  const verifyJwtMiddleware = new FastifyHandler(new VerifyJwtMiddleware())
  const verifyPermissionMiddleware = new FastifyHandler(
    new VerifyRolePermissionMiddleware('categories-control'),
  )

  app.get(
    '/',
    {
      preHandler: [verifyJwtMiddleware.handle],
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return listCategoryController.handle(http)
    },
  )

  app.get(
    '/:categoryId',
    {
      preHandler: [verifyJwtMiddleware.handle],
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
        verifyJwtMiddleware.handle,
        verifyPermissionMiddleware.handle.bind(verifyPermissionMiddleware),
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
        verifyJwtMiddleware.handle,
        verifyPermissionMiddleware.handle.bind(verifyPermissionMiddleware),
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
        verifyJwtMiddleware.handle,
        verifyPermissionMiddleware.handle.bind(verifyPermissionMiddleware),
      ],
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return deleteCategoryController.handle(http)
    },
  )
}
