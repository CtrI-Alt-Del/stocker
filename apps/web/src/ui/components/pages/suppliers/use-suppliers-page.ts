import { CACHE } from '@/constants'
import { useApi, useCache, useToast, useUrlParamNumber } from '@/ui/hooks'
import type { UserDto } from '@stocker/core/dtos'
import { useState } from 'react'
import { useAuthContext } from '../../contexts/auth-context'

export function useSuppliersPage() {
  const { showSuccess, showError } = useToast()
  const { usersService } = useApi()
  const [page, setPage] = useUrlParamNumber('page', 1)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [selectedSuppliersIds, setSelectdSuppliersIds] = useState<string[]>([])
  function handlePageChange(page: number) {
    setPage(page)
  }
  const { user } = useAuthContext()
  const companyId = user ? user.companyId : ''
  async function fetchUsers() {
    const response = await usersService.listUsers({ page, companyId: companyId })
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
  async function handleUpdateSupplier() {
    refetch()
  }
  async function handleRegisterSupplierFormSubmit() {
    refetch()
  }
  async function handleDeleteSuppliersAlertDialogConfirm() {
    setIsDeleting(true)
    const response = await usersService.deleteUser(selectedSuppliersIds)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    if (response.isSuccess) {
      showSuccess(
        selectedSuppliersIds.length > 1
          ? 'Fornecedores deletados com sucesso'
          : 'Fornecedor deletado com sucesso',
      )
    }
    setSelectdSuppliersIds([])
    setIsDeleting(false)
    refetch()
  }
  function handleSuppliersSelectionChange(suppliersIds: string[]) {
    setSelectdSuppliersIds(suppliersIds)
  }
  const users = data?.items ? data.items : []
  const totalPages = data?.itemsCount ? data.itemsCount : 0
  return {
    handleRegisterSupplierFormSubmit,
    handleDeleteSuppliersAlertDialogConfirm,
    totalPages: Math.ceil(totalPages / 10),
    page,
    isDeleting,
    handlePageChange,
    users,
    isLoading: isFetching,
    handleSuppliersSelectionChange,
    selectedSuppliersIds,
    handleUpdateSupplier,
  }
}
