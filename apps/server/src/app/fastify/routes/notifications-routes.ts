import type { FastifyInstance } from 'fastify'
import { FastifyHttp } from '../fastify-http'
import {
  DeleteNotificationController,
  ListNotificationsController,
} from '@/api/controllers/notifications'
import { VerifyJwtMiddleware, VerifyUserRoleMiddleware } from '@/api/middlewares'
import { FastifyHandler } from '../fastify-handler'

export const NotificationsRoutes = async (app: FastifyInstance) => {
  const deleteNotificationController = new DeleteNotificationController()
  const listNotificationsController = new ListNotificationsController()
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
      return listNotificationsController.handle(http)
    },
  )

  app.delete(
    '/:notificationId',
    {
      preHandler: [
        verifyJwtMiddleware.handle.bind(verifyJwtMiddleware),
        verifyEmployeeRoleMiddleware.handle.bind(verifyManagerRoleMiddleware),
      ],
    },
    async (request, response) => {
      const http = new FastifyHttp(request, response)
      return deleteNotificationController.handle(http)
    },
  )
}
