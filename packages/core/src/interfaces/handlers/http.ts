import type { UserDto } from '../../dtos'

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
  send(response: unknown, statusCode?: number): unknown
  notFound(): unknown
  redirect(route: string): unknown
  getFile(): Promise<Buffer>
  getImageFile(): Promise<Buffer>
  verifyJwt(): Promise<boolean>
  pass(): unknown
}
