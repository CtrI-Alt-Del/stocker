export interface IHttp<Body = void, RouteParams = void, QueryParams = void> {
  body: Body
  routeParams: RouteParams
  queryParams: QueryParams
  send(response: unknown, statusCode?: number): unknown
  redirect(route: string): unknown
}
