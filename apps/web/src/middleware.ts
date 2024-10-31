import type { NextRequest, MiddlewareConfig } from 'next/server'
import { NextHttp } from './api/next/http'
import { VerifyJwtMiddleware } from './api/middlewares'

const Middleware = async (request: NextRequest) => {
  const http = NextHttp(request)
  const middlewares = [VerifyJwtMiddleware()]

  for (const middleware of middlewares) {
    const response = await middleware.handle(http)
    if (response) return response
  }
}

export const config: MiddlewareConfig = {
  matcher: '^(?:/(?:[^/]+/)*)([^/]+)(?:/([^/]+))?(?:/([^/]+))?$',
}

export default Middleware
