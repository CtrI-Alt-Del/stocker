import { CACHE } from '@/constants'
import { useApi, useCache, useToast, useUrlParamNumber } from '@/ui/hooks'
import { Supplier } from '@stocker/core/entities'
import { useState } from 'react'
import { useAuthContext } from '../../contexts/auth-context'

export function useSupplierSelect(
  onSelectChange: (supplierId: string) => void,
  defeaultSelectedSupplierId?: string,
) {
  const [supplierId, setSupplierId] = useState(defeaultSelectedSupplierId)
  const { suppliersService } = useApi()
  const { company } = useAuthContext()
  const { showError } = useToast()
  const [page, setPage] = useUrlParamNumber('supplierPage', 1)
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})

  function handleSupplierIdChange(supplierId: string) {
    setSupplierId(supplierId)
    onSelectChange(supplierId)
  }

  async function fetchSupplier() {
    if (!supplierId) return

    const response = await suppliersService.getSupplier(supplierId)
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    return response.body
  }

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

  const { data: supplierData } = useCache({
    fetcher: fetchSupplier,
    key: CACHE.supplier.key,
    dependencies: [supplierId],
  })

  const { data: suppliersData, isFetching } = useCache({
    fetcher: fetchSuppliers,
    key: CACHE.suppliers.key,
    dependencies: [page],
  })

  function handlePageChange(page: number) {
    setPage(page)
  }

  function handleAccordionClick(id: string) {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  console.log(suppliersData)
  console.log(company?.id)
  const suppliers = suppliersData ? suppliersData.items.map(Supplier.create) : []
  const itemsCount = suppliersData ? suppliersData.itemsCount : 0

  return {
    isFetching,
    totalPages: Math.ceil(itemsCount / 10),
    page,
    suppliers,
    selectedSupplierName: supplierData?.name,
    expandedItems,
    handleSupplierIdChange,
    handleAccordionClick,
    handleSupplierPageChange: handlePageChange,
  }
}
