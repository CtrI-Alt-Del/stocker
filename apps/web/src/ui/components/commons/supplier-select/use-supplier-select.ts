import { CACHE } from '@/constants'
import { useApi, useCache, useToast, useUrlParamNumber } from '@/ui/hooks'
import { Supplier } from '@stocker/core/entities'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/auth-context'

export function useSupplierSelect(
  onSelectChange: (supplierId: string) => void,
  defaultSelectedSupplierId?: string,
) {
  const [supplierId, setSupplierId] = useState(defaultSelectedSupplierId)
  const { suppliersService } = useApi()
  const { company } = useAuthContext()
  const { showError } = useToast()
  const [page, setPage] = useUrlParamNumber('supplierPage', 1)
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})
  const [selectedSupplierName, setSelectedSupplierName] = useState<string | undefined>(undefined)

  async function fetchSupplier() {
    if (!supplierId) {
      return
    }
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

  useEffect(() => {
    if (supplierData) {
      setSelectedSupplierName(supplierData.name)
    }
  }, [supplierData])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    if (defaultSelectedSupplierId) {
      const fetchInitialSupplier = async () => {
        const response = await suppliersService.getSupplier(defaultSelectedSupplierId)
        if (response.isFailure) {
          showError(response.errorMessage)
        } else {
          setSelectedSupplierName(response.body.name)
        }
      }
      fetchInitialSupplier()
    }
  }, [defaultSelectedSupplierId])

  function handleSupplierIdChange(supplierId: string) {
    setSupplierId(supplierId)

    const selectedSupplier = suppliers.find((supplier) => supplier.id === supplierId)
    if (selectedSupplier) {
      setSelectedSupplierName(selectedSupplier.name)
    }

    onSelectChange(supplierId)
  }

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
    selectedSupplierName,
    expandedItems,
    handleSupplierIdChange,
    handleAccordionClick,
    handleSupplierPageChange: handlePageChange,
  }
}
