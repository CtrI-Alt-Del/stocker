import type { FastifyInstance } from 'fastify'
import type { WebSocket } from '@fastify/websocket'

import type { IWs } from '@stocker/core/interfaces'
import { RealtimeResponse } from '@stocker/core/responses'

type FastifyWsProps = {
  socket: WebSocket
  server: FastifyInstance
}

export class FastifyWs implements IWs {
  private readonly socket: WebSocket
  private readonly server: FastifyInstance

  constructor({ server, socket }: FastifyWsProps) {
    this.server = server
    this.socket = socket
  }

  on<Payload>(event: string, callback: (payload?: Payload) => void): void {
    this.socket.on('message', async (message: string) => {
      const response = RealtimeResponse.parseMessage(message)

      if (event === response.event) {
        callback(response.payload)
      }
    })
  }

  onClose(callback: VoidFunction): void {
    this.socket.on('close', () => {
      callback()
    })
  }

  emit(event: string, payload: unknown): void {
    const response = new RealtimeResponse({ event, payload })
    this.socket.send(response.message)
  }

  broadcast(event: string, payload: unknown): void {
    const response = new RealtimeResponse({ event, payload })
    for (const client of this.server.websocketServer.clients) {
      client.send(response.message)
    }
  }
}
