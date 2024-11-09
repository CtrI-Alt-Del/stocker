import type { FastifyInstance } from 'fastify'

import { FastifyWs } from '../fastify-ws'
import { NotificationsRoom } from '@/realtime/rooms'

export const NotificationsRoutes = async (app: FastifyInstance) => {
  const ws = new FastifyWs(app)

  app.get(
    '/:companyId',
    {
      websocket: true,
    },
    async (socket, request) => {
      const { companyId } = request.params as { companyId: string }
      const notificationsRoom = new NotificationsRoom(companyId)
      notificationsRoom.handle(ws)

      ws.join(companyId, socket)
    },
  )
}
