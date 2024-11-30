import { REALTIME_EVENTS } from '@stocker/core/constants'
import type { IRoom, IWs } from '@stocker/core/interfaces'

export class AuthRoom implements IRoom {
  constructor(private readonly userId: string) {}
  handle(ws: IWs): void {
    ws.on(REALTIME_EVENTS.authRoom.accountLogged, this.userId, async () => {
      ws.emit(REALTIME_EVENTS.authRoom.accountLogged, this.userId, this.userId)
    })

    ws.on(
      REALTIME_EVENTS.authRoom.unknownAccountDetected,
      this.userId,
      async (jwt: string) => {
        ws.emit(REALTIME_EVENTS.authRoom.unknownAccountLogout, this.userId, jwt)
      },
    )
  }
}
