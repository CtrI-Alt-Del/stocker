'use server'

import { NextServerApiClient } from '@/api/next/clients/next-server-api-client'
import { AuthService } from '@/api/services'
import type { RolePermission } from '@stocker/core/types'

export async function verifyRolePermissionAction(permission: RolePermission) {
  const apiClient = await NextServerApiClient({ isCacheEnabled: false })
  const authService = AuthService(apiClient)
  const response = await authService.getPermissions()
  if (response.isFailure) response.throwError()

  return response.body.includes(permission)
}
