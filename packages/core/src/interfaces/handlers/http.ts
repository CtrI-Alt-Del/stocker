import type { UserDto } from '../../dtos'
import type { HttpContentType } from '../../types'

export interface IHttp {
  getBody<Body>(): Body
  getRouteParams<RouteParams>(): RouteParams
  getQueryParams<QueryParams>(): QueryParams
  getCurrentRoute(): string
  setHeader(key: string, value: string): void
  setJwt(user: UserDto): Promise<string>
  destroyJwt(): void
  getCookie<Data>(key: string): Data | null
  setCookie(key: string, value: string, duration: number): void
  getUser(): Promise<UserDto>
  send(data: unknown, statusCode?: number): unknown
  sendFile(
    file: Buffer,
    filename: string,
    contentType: HttpContentType,
    statusCode?: number,
  ): unknown
  redirect(route: string): unknown
  getFile(): Promise<Buffer>
  getImageFile(): Promise<Buffer>
  verifyJwt(): Promise<boolean>
  pass(): unknown
}
