'use server'

import { NextServerApiClient } from '@/api/next/clients/next-server-api-client'
import { AuthService } from '@/api/services'
import { Role } from '@stocker/core/structs'
import type { RolePermission } from '@stocker/core/types'

export async function verifyRolePermissionAction(permission: RolePermission) {
  const apiClient = await NextServerApiClient({ isCacheEnabled: false })
  const authService = AuthService(apiClient)
  const response = await authService.getPermissions()
  if (response.isFailure) response.throwError()

  if (!response.body.name || !response.body.permissions) return false

  const userRole = Role.create(response.body.name, response.body.permissions)
  return userRole.hasPermission(permission)
}
