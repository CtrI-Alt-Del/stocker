import type { FormEvent } from 'react'

import { CACHE } from '@/constants'
import { useAuthContext } from '@/ui/components/contexts/auth-context'
import { useApi, useCache, useToast } from '@/ui/hooks'
import { Role } from '@stocker/core/structs'
import type { RoleName } from '@stocker/core/types'

export function useRolesControl() {
  const { company } = useAuthContext()
  const { companiesService } = useApi()
  const { showError } = useToast()

  function handleManagerPermissionChange(formEvent: FormEvent, role: RoleName) {
    formEvent.preventDefault()
  }

  async function fetchRoles() {
    if (!company) return

    const response = await companiesService.getCompanyRoles(company.id)

    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    const roles = response.body.map(({ name, permissions }) =>
      Role.create(name, permissions),
    )
    return {
      manager: roles.find((role) => role.name === 'manager'),
      employee: roles.find((role) => role.name === 'employee'),
    }
  }

  const { data, isFetching } = useCache({
    fetcher: fetchRoles,
    key: CACHE.companyRoles.key,
    dependencies: [company?.id],
  })

  return {
    roles: data,
    isFetching,
    handleManagerPermissionChange,
  }
}
