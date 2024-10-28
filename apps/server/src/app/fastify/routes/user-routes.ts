import type { FastifyInstance } from 'fastify'

import {
  RegisterUserController,
  DeleteUsersController,
  UpdateUserController
} from '@/api/controllers/users'
import { FastifyHttp } from '../fastify-http'

export const UsersRoutes = async (app: FastifyInstance) => {
  const registerUserController = new RegisterUserController()
  const deleteUsersController = new DeleteUsersController()
  const updateUserController = new UpdateUserController()

  app.post('/', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return registerUserController.handle(http)
  })

  app.put('/:userId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return updateUserController.handle(http)
  })

  app.delete('/userId', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return deleteUsersController.handle(http)
  })
}
