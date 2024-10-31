import type { NextRequest } from 'next/server'

import { RequestPasswordResetController } from '@/api/controllers/auth'
import { NextHttp } from '@/api/next/http'

export default function POST(request: NextRequest) {
  const http = NextHttp(request)
  const controller = RequestPasswordResetController()

  return controller.handle(http)
}
