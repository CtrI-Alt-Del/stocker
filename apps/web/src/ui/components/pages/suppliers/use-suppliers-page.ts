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

export function useSuppliersPage() {
  const { showSuccess, showError } = useToast()
  const { suppliersService } = useApi()
  const [page, setPage] = useUrlParamNumber('page', 1)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [nameSearchValue, setNameSerchValue] = useUrlParamString('name')
  const [selectedSuppliersIds, setSelectdSuppliersIds] = useState<string[]>([])
  function handlePageChange(page: number) {
    setPage(page)
  }
  const { user } = useAuthContext()
  async function fetchUsers() {
    if (!user) return
    const response = await suppliersService.listSuppliers({
      page,
      companyId: user.companyId,
      name: nameSearchValue,
    })
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    return response.body
  }
  function handleNameSearchChange(name: string) {
    setNameSerchValue(name)
  }
  const { data, isFetching, refetch } = useCache({
    fetcher: fetchUsers,
    key: CACHE.users.key,
    dependencies: [page, nameSearchValue],
  })
  async function handleUpdateSupplier() {
    refetch()
  }
  async function handleRegisterSupplierFormSubmit() {
    refetch()
  }
  async function handleDeleteSuppliersAlertDialogConfirm() {
    setIsDeleting(true)
    const response = await suppliersService.deleteSupplier(selectedSuppliersIds)
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
  const suppliers = data?.items ? data.items : []
  const totalPages = data?.itemsCount ? data.itemsCount : 0
  return {
    handleRegisterSupplierFormSubmit,
    handleDeleteSuppliersAlertDialogConfirm,
    totalPages: Math.ceil(totalPages / 10),
    page,
    isDeleting,
    handlePageChange,
    suppliers,
    isLoading: isFetching,
    handleSuppliersSelectionChange,
    selectedSuppliersIds,
    handleUpdateSupplier,
    nameSearchValue,
    handleNameSearchChange,
  }
}
