import type { FastifyInstance } from 'fastify'

import {
  RegisterUserController,
  DeleteUsersController,
  UpdateUserController,
  ListUsersController,
  CountCompanyUsersController,
} from '@/api/controllers/users'
import { FastifyHttp } from '../fastify-http'
import { FastifyHandler } from '../fastify-handler'
import { VerifyJwtMiddleware, VerifyUserRoleMiddleware } from '@/api/middlewares'

export const UsersRoutes = async (app: FastifyInstance) => {
  const registerUserController = new RegisterUserController()
  const deleteUsersController = new DeleteUsersController()
  const updateUserController = new UpdateUserController()
  const listUsersController = new ListUsersController()
  const countCompanyUserController = new CountCompanyUsersController()
  const verifyJwtMiddleware = new FastifyHandler(new VerifyJwtMiddleware())
  const verifyAdminRoleMiddleware = new FastifyHandler(
    new VerifyUserRoleMiddleware('admin'),
  )
  const preHandlers = [verifyJwtMiddleware, verifyAdminRoleMiddleware].map((handler) =>
    handler.handle.bind(handler),
  )

  app.post('/', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerUserController.handle(http)
  })

  app.get('/', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return listUsersController.handle(http)
  })

  app.put('/:userId', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return updateUserController.handle(http)
  })

  app.get('/company', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return countCompanyUserController.handle(http)
  })

  app.delete('/', { preHandler: preHandlers }, async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteUsersController.handle(http)
  })
}
