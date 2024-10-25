import { useToast, useUrlParamNumber } from '@/ui/hooks'
import type { UserDto } from '@stocker/core/dtos'
import { useState } from 'react'

export function useEmployeesPage() {
  const { showSuccess, showError } = useToast()
  const [page, setPage] = useUrlParamNumber('page', 1)
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
  async function handleDeleteEmployeesAlertDialogConfirm() {
    console.log(selectedEmployeesIds)
  }
  function handleEmployeesSelectionChange(employeesIds: string[]) {
    setSelectdEmployeesIds(employeesIds)
  }
  return {
    handleDeleteEmployeesAlertDialogConfirm,
    totalPages: Math.ceil(totalPages / 10),
    page,
    handlePageChange,
    tempoUser,
    isLoading,
    handleEmployeesSelectionChange,
    selectedEmployeesIds,
    handleUpdateEmployee,
  }
}
