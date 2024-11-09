import type { FastifyInstance } from 'fastify'

import { FastifyWs } from '../fastify-ws'
import { NotificationsChannel } from '@/realtime/channels'

export const NotificationsRoutes = async (app: FastifyInstance) => {
  app.get(
    '/:companyId',
    {
      websocket: true,
    },
    async (socket, request) => {
      const { companyId } = request.params as { companyId: string }
      const notificationsChannel = new NotificationsChannel(companyId)
      const ws = new FastifyWs({ server: app, socket })
      return notificationsChannel.handle(ws)
    },
  )
}
