import type { FastifyInstance } from 'fastify'

import { FastifyHttp } from '../fastify-http'
import { FastifyHandler } from '../fastify-handler'
import {
  ConfirmAuthController,
  DeleteAccountController,
  LoginController,
  LogoutController,
  ResetPasswordController,
  SubscribeController,
  UpdateAccountController,
} from '@/api/controllers/auth'
import { VerifyJwtMiddleware, VerifyRolePermissionMiddleware } from '@/api/middlewares'
import { RequestPasswordResetController } from '@/api/controllers/auth/request-password-reset-controller'
import { FastifyWs } from '../fastify-ws'
import { AuthRoom } from '@/realtime/rooms'

export const AuthRoutes = async (app: FastifyInstance) => {
  const subscribeController = new SubscribeController()
  const loginController = new LoginController()
  const logoutController = new LogoutController()
  const deleteAccountController = new DeleteAccountController()
  const updateAccountController = new UpdateAccountController()
  const requestPasswordResetController = new RequestPasswordResetController()
  const verifyJwtMiddleware = new FastifyHandler(new VerifyJwtMiddleware())
  const verifyAdminRoleMiddleware = new FastifyHandler(
    new VerifyRolePermissionMiddleware('all'),
  )
  const resetPasswordController = new ResetPasswordController()
  const confirmAuthController = new ConfirmAuthController()
  const ws = new FastifyWs(app)

  app.get('/:userId', { websocket: true }, async (socket, request) => {
    const { userId } = request.params as { userId: string }
    const authRoom = new AuthRoom(userId)
    authRoom.handle(ws)

    ws.join(userId, socket)
  })

  app.post('/confirm', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return confirmAuthController.handle(http)
  })

  app.post('/subscribe', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return subscribeController.handle(http)
  })

  app.post('/login', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return loginController.handle(http)
  })

  app.post('/password', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return requestPasswordResetController.handle(http)
  })

  app.delete(
    '/logout',
    { preHandler: [verifyJwtMiddleware.handle] },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return logoutController.handle(http)
    },
  )

  app.patch('/password', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return resetPasswordController.handle(http)
  })

  app.put(
    '/account',
    {
      preHandler: [
        verifyJwtMiddleware.handle.bind(verifyJwtMiddleware),
        verifyAdminRoleMiddleware.handle.bind(verifyAdminRoleMiddleware),
      ],
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return updateAccountController.handle(http)
    },
  )

  app.delete(
    '/account',
    {
      preHandler: [
        verifyJwtMiddleware.handle.bind(verifyJwtMiddleware),
        verifyAdminRoleMiddleware.handle.bind(verifyAdminRoleMiddleware),
      ],
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return deleteAccountController.handle(http)
    },
  )
}
