import { CACHE } from '@/constants'
import { useApi, useCache, useToast, useUrlParamNumber } from '@/ui/hooks'
import type { UserDto } from '@stocker/core/dtos'
import { useState } from 'react'

export function useEmployeesPage() {
  const { showSuccess, showError } = useToast()
  const { usersService } = useApi()
  const [page, setPage] = useUrlParamNumber('page', 1)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [selectedEmployeesIds, setSelectdEmployeesIds] = useState<string[]>([])
  function handlePageChange(page: number) {
    setPage(page)
  }
  async function fetchUsers() {
    const response = await usersService.listUsers({ page, companyId: '123' })
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    return response.body
  }
  const { data, isFetching, refetch } = useCache({
    fetcher: fetchUsers,
    key: CACHE.users.key,
    dependencies: [page],
  })
  async function handleUpdateEmployee() {
    refetch()
  }
  async function handleRegisterEmployeeFormSubmit() {
    refetch()
  }
  async function handleDeleteEmployeesAlertDialogConfirm() {
    setIsDeleting(true)
    const response = await usersService.deleteUser(
      selectedEmployeesIds,
    )
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
    handleRegisterEmployeeFormSubmit,
    handleDeleteEmployeesAlertDialogConfirm,
    totalPages: Math.ceil(totalPages / 10),
    page,
    isDeleting,
    handlePageChange,
    users,
    isLoading: isFetching,
    handleEmployeesSelectionChange,
    selectedEmployeesIds,
    handleUpdateEmployee,
  }
}
