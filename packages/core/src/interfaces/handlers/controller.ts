import type { IHttp } from './http'

export interface IController {
  handle(http: IHttp): Promise<unknown>
}
