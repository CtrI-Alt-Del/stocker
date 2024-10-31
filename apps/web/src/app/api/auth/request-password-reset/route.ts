import { RequestPasswordResetController } from '@/api/controllers/auth'
import { NextApiClient } from '@/api/next/clients'

export default function POST() {
  const apiClient = NextApiClient()
  const http = 
  const controller = RequestPasswordResetController()

  return controller.handle()
}
