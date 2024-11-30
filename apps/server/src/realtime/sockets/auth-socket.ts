import WebSocket from 'ws'

import { RealtimeResponse } from '@stocker/core/responses'
import { REALTIME_EVENTS } from '@stocker/core/constants'
import type { IAuthSocket } from '@stocker/core/interfaces'

import { ENV } from '@/constants'

export class AuthSocket implements IAuthSocket {
  private readonly ws: WebSocket
  private readonly userId: string

  constructor(userId: string) {
    this.ws = new WebSocket(`ws://${ENV.domain}:${ENV.port}/auth/${userId}`)
    this.userId = userId
  }

  emitAccountLogged(): void {
    const response = new RealtimeResponse({
      event: REALTIME_EVENTS.authRoom.accountLogged,
      payload: this.userId,
    })

    this.ws.send(response.message)
  }
}
