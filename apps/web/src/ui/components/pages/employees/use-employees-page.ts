import { useApi, useToast, useUrlParamNumber } from '@/ui/hooks'
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
  // THIS HERE GENERATES A ERROR SINCE ITS MOCK DATA IN CLIENT SIDE!!!! BUT ITS TEMPORARY SO WHATEVER
  const tempoUser: UserDto[] = [
    {
      id: '1',
      role: 'manager',
      email: 'manager@example.com',
      name: 'Alice Manager',
      password: 'securePassword1',
    },
    {
      id: '2',
      role: 'employee',
      email: 'employee@example.com',
      name: 'Bob Employee',
      password: 'securePassword2',
    },
  ]
  const isLoading = false
  const totalPages = 11
  async function handleUpdateEmployee() {
    console.log('banana')
  }
  async function handleRegisterEmployeeFormSubmit(){
    console.log("banana")
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
  }
  function handleEmployeesSelectionChange(employeesIds: string[]) {
    setSelectdEmployeesIds(employeesIds)
  }
  return {
    handleRegisterEmployeeFormSubmit,
    handleDeleteEmployeesAlertDialogConfirm,
    totalPages: Math.ceil(totalPages / 10),
    page,
    isDeleting,
    handlePageChange,
    tempoUser,
    isLoading,
    handleEmployeesSelectionChange,
    selectedEmployeesIds,
    handleUpdateEmployee,
  }
}
