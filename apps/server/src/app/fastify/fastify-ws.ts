import type { FastifyInstance } from 'fastify'
import type { WebSocket } from '@fastify/websocket'

import type { IWs } from '@stocker/core/interfaces'
import { RealtimeResponse } from '@stocker/core/responses'

type Room = {
  sockets: WebSocket[]
  callbacks: Record<string, <Payload>(payload?: Payload) => void>
}

export class FastifyWs implements IWs {
  private readonly rooms: Record<string, Room> = {}
  private readonly server: FastifyInstance

  constructor(server: FastifyInstance) {
    this.server = server
  }

  on(
    event: string,
    roomId: string,
    callback: <Payload>(payload?: Payload) => void,
  ): void {
    if (!this.rooms[roomId])
      this.rooms[roomId] = {
        sockets: [],
        callbacks: {},
      }

    this.rooms[roomId].callbacks[event] = callback
  }

  emit(event: string, roomId: string, payload: unknown): void {
    const room = this.rooms[roomId]
    if (!room) return

    const response = new RealtimeResponse({ event, payload })

    for (const socket of room.sockets) socket.send(response.message)
  }

  broadcast(event: string, payload: unknown): void {
    const response = new RealtimeResponse({ event, payload })
    for (const client of this.server.websocketServer.clients) {
      client.send(response.message)
    }
  }

  join<Socket extends WebSocket>(roomId: string, socket: Socket): void {
    const room = this.rooms[roomId]
    if (!room) return

    socket.on('message', async (message: string) => {
      const response = RealtimeResponse.parseMessage(message)
      const callback = room.callbacks[response.event]
      if (callback) callback(response.payload)
    })

    socket.on('close', () => {
      room.sockets = room.sockets.filter((roomSocket) => roomSocket !== socket)
    })

    room.sockets.push(socket)
  }
}
