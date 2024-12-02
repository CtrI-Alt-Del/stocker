'use client'

import { useState } from 'react'
import type { Role } from '@stocker/core/structs'
import type { RolePermission } from '@stocker/core/types'
import { useApi, useToast } from '@/ui/hooks'

export function useRolesControl(
  defualtManagerRole: Role | null,
  defualtEmployeeRole: Role | null,
  companyId: string,
) {
  const [managerRole, setManagerRole] = useState<Role | null>(defualtManagerRole)
  const [employeeRole, setEmployeeRole] = useState<Role | null>(defualtEmployeeRole)
  const { companiesService } = useApi()
  const { showError, showSuccess } = useToast()

  async function handleManagerPermissionChange(permission: RolePermission) {
    if (!managerRole) return

    const updatedManagerRole = managerRole.togglePermission(permission)
    setManagerRole(updatedManagerRole)

    const response = await companiesService.updateCompanyRole(
      updatedManagerRole,
      companyId,
    )

    if (response.isFailure) {
      showError(response.errorMessage)
      setManagerRole(defualtManagerRole)
      return
    }

    showSuccess('Permissão atualizada')
  }

  async function handleEmployeePermissionChange(permission: RolePermission) {
    if (!employeeRole) return

    const updatedEmployeeRole = employeeRole.togglePermission(permission)
    setEmployeeRole(updatedEmployeeRole)

    const response = await companiesService.updateCompanyRole(
      updatedEmployeeRole,
      companyId,
    )

    if (response.isFailure) {
      showError(response.errorMessage)
      setEmployeeRole(defualtEmployeeRole)
      return
    }

    showSuccess('Permissão atualizada')
  }

  return {
    managerRole,
    employeeRole,
    handleManagerPermissionChange,
    handleEmployeePermissionChange,
  }
}
