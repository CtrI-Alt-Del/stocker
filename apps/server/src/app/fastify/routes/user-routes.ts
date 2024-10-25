import type { FastifyInstance } from 'fastify'

import {
  RegisterUserController,
  DeleteUsersController,
} from '@/api/controllers/users'
import { FastifyHttp } from '../fastify-http'

export const UsersRoutes = async (app: FastifyInstance) => {
  const registerUserController = new RegisterUserController()
  const deleteUsersController = new DeleteUsersController()

  app.post('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerUserController.handle(http)
  })

  app.delete('/users', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteUsersController.handle(http)
  })
}
