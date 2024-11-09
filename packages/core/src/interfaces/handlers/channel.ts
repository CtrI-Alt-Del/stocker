import type { IWs } from './ws'

export interface IChannel {
  handle(socket: IWs): void
}
