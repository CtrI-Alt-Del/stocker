export interface IHttp {
  getBody<Body>(): Body
  getRouteParams<RouteParams>(): RouteParams
  getQueryParams<QueryParams>(): QueryParams
  setHeader(key: string, value: string): void
  send(response: unknown, statusCode?: number): unknown
  redirect(route: string): unknown
  getFile(): Promise<Buffer>
  getImageFile(): Promise<Buffer>
}
