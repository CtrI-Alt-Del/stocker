import type { RoleName } from '@stocker/core/types'

import { CACHE } from '@/constants'
import {
  useApi,
  useCache,
  useToast,
  useUrlParamNumber,
  useUrlParamString,
} from '@/ui/hooks'
import { useState } from 'react'
import { useAuthContext } from '../../contexts/auth-context'

export function useEmployeesPage() {
  const { showSuccess, showError } = useToast()
  const [nameSearchValue, setNameSerchValue] = useUrlParamString('name')
  const [roleSearchValue, setRoleSearchValue] = useUrlParamString('role')
  const { usersService } = useApi()
  const [page, setPage] = useUrlParamNumber('page', 1)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [selectedEmployeesIds, setSelectdEmployeesIds] = useState<string[]>([])
  function handlePageChange(page: number) {
    setPage(page)
  }
  function handleRoleSearchChange(role: string) {
    setRoleSearchValue(role)
  }
  function handleNameSearchChange(name: string) {
    setNameSerchValue(name)
  }

  const { user } = useAuthContext()
  const companyId = user ? user.companyId : ''
  async function fetchUsers() {
    const response = await usersService.listUsers({
      page,
      companyId: companyId,
      name: nameSearchValue,
      role: roleSearchValue as RoleName,
    })
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    return response.body
  }
  const { data, isFetching, refetch } = useCache({
    fetcher: fetchUsers,
    key: CACHE.users.key,
    dependencies: [page, nameSearchValue, roleSearchValue],
  })
  async function handleUpdateEmployee() {
    refetch()
  }
  async function handleRegisterEmployeeFormSubmit() {
    refetch()
  }
  async function handleDeleteEmployeesAlertDialogConfirm() {
    setIsDeleting(true)
    const response = await usersService.deleteUser(selectedEmployeesIds)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    if (response.isSuccess) {
      showSuccess(
        selectedEmployeesIds.length > 1
          ? 'Funcionários deletados com sucesso'
          : 'Funcinário deletado com sucesso',
      )
    }
    setSelectdEmployeesIds([])
    setIsDeleting(false)
    refetch()
  }
  function handleEmployeesSelectionChange(employeesIds: string[]) {
    setSelectdEmployeesIds(employeesIds)
  }
  const users = data?.items ? data.items : []
  const totalPages = data?.itemsCount ? data.itemsCount : 0
  return {
    page,
    totalPages: Math.ceil(totalPages / 10),
    isDeleting,
    users,
    isLoading: isFetching,
    selectedEmployeesIds,
    nameSearchValue,
    roleSearchValue,
    handleRegisterEmployeeFormSubmit,
    handleDeleteEmployeesAlertDialogConfirm,
    handleEmployeesSelectionChange,
    handlePageChange,
    handleUpdateEmployee,
    handleNameSearchChange,
    handleRoleSearchChange,
  }
}
