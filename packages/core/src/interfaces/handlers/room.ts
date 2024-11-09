import type { IWs } from './ws'

export interface IRoom {
  handle(socket: IWs): void
}
