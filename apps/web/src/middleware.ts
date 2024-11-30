import type { NextRequest, MiddlewareConfig } from 'next/server'

import { NextHttp } from './api/next/http'
import { RedirectByUserRoleMiddleware, VerifyJwtMiddleware } from './api/middlewares'

const Middleware = async (request: NextRequest) => {
  const http = NextHttp(request)
  const middlewares = [VerifyJwtMiddleware(), RedirectByUserRoleMiddleware()]

  for (const middleware of middlewares) {
    const response = await middleware.handle(http)
    if (response) return response
  }
}

export const config: MiddlewareConfig = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/profile/:path*',
    '/inventory/:path*',
    '/inventory/stocks/:productId*',
    '/records/:path*',
    '/categories/:path*',
  ],
}

export default Middleware
