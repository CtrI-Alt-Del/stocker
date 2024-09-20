export interface IHttp {
  getBody<Body>(): Body
  getRouteParams<RouteParams>(): RouteParams
  getQueryParams<QueryParams>(): QueryParams
  send(response: unknown, statusCode?: number): unknown
  redirect(route: string): unknown
  getFile(): Promise<Buffer>
  getImageFile(): Promise<Buffer>
}
