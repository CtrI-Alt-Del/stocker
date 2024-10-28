import type { UserDto } from '../../dtos'

export interface IHttp {
  getBody<Body>(): Body
  getRouteParams<RouteParams>(): RouteParams
  getQueryParams<QueryParams>(): QueryParams
  setHeader(key: string, value: string): void
  setJwt(user: UserDto): Promise<string>
  destroyJwt(): void
  getUser(): Promise<UserDto>
  send(response: unknown, statusCode?: number): unknown
  redirect(route: string): unknown
  getFile(): Promise<Buffer>
  getImageFile(): Promise<Buffer>
  verifyJwt(): Promise<boolean>
  pass(): unknown
}
