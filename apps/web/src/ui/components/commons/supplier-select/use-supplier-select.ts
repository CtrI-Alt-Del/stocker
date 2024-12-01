import { CACHE } from '@/constants'
import { useApi, useCache, useToast } from '@/ui/hooks'
import { Supplier } from '@stocker/core/entities'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/auth-context'
import { PAGINATION } from '@stocker/core/constants'

export function useSupplierSelect(
  onSelectChange: (supplierId: string) => void,
  defaultSelectedSupplierId?: string,
) {
  const { suppliersService } = useApi()
  const { company } = useAuthContext()
  const { showError } = useToast()
  const [page, setPage] = useState(1)
  const [supplierId, setSupplierId] = useState(defaultSelectedSupplierId)

  async function fetchSuppliers() {
    if (!company) return

    const response = await suppliersService.listSuppliers({
      page,
    })
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    return response.body
  }

  const { data: suppliersData, isFetching } = useCache({
    fetcher: fetchSuppliers,
    key: CACHE.suppliers.key,
    dependencies: [page],
  })

  function handleSupplierIdChange(supplierId: string) {
    setSupplierId(supplierId)
    onSelectChange(supplierId)
  }

  function handlePageChange(page: number) {
    setPage(page)
  }

  const suppliers = suppliersData ? suppliersData.items.map(Supplier.create) : []
  const itemsCount = suppliersData ? suppliersData.itemsCount : 0

  return {
    isFetching,
    totalPages: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    page,
    suppliers,
    selectedSupplierName: suppliers.find((supplier) => supplier.id === supplierId)?.name,
    handleSupplierIdChange,
    handleSupplierPageChange: handlePageChange,
  }
}
