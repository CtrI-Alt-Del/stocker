import type { FastifyInstance } from 'fastify'

import { FastifyHttp } from '../fastify-http'
import { FastifyHandler } from '../fastify-handler'
import {
  DeleteAccountController,
  LoginController,
  LogoutController,
  ResetPasswordController,
  SubscribeController,
} from '@/api/controllers/auth'
import { VerifyJwtMiddleware, VerifyUserRoleMiddleware } from '@/api/middlewares'
import { RequestPasswordResetController } from '@/api/controllers/auth/request-password-reset-controller'

export const AuthRoutes = async (app: FastifyInstance) => {
  const subscribeController = new SubscribeController()
  const loginController = new LoginController()
  const logoutController = new LogoutController()
  const deleteAccountController = new DeleteAccountController()
  const requestPasswordResetController = new RequestPasswordResetController()
  const verifyJwtMiddleware = new FastifyHandler(new VerifyJwtMiddleware())
  const verifyAdminRoleMiddleware = new FastifyHandler(
    new VerifyUserRoleMiddleware('admin'),
  )
  const resetPasswordController = new ResetPasswordController()

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
    { preHandler: [verifyJwtMiddleware.handle.bind(verifyJwtMiddleware)] },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return logoutController.handle(http)
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

  app.patch('/password', async (request, response) => {
    const http = new FastifyHttp(request, response)
    return resetPasswordController.handle(http)
  })
}
