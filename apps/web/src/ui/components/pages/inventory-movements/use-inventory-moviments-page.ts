import { CACHE } from '@/constants'
import {
  useApi,
  useCache,
  useToast,
  useUrlParamNumber,
  useUrlParamString,
} from '@/ui/hooks'
import { PAGINATION } from '@stocker/core/constants'
import { InventoryMovement } from '@stocker/core/entities'
import type { InventoryMovementType } from '@stocker/core/types'
import { useState } from 'react'

export function useInventoryMovementPage() {
  const { inventoryMovementService } = useApi()
  const { showError } = useToast()
  const [page, setPage] = useUrlParamNumber('page', 1)
  const [movementTypeSearch, setMovementTypeSearch] = useUrlParamString('type')
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [employeeIdSearch, setEmployeIdSearch] = useUrlParamString('employeeId')

  async function fetchInventoryMovements() {
    const response = await inventoryMovementService.listInventoryMovements({
      movementType: movementTypeSearch as InventoryMovementType,
      responsibleId: employeeIdSearch,
      page,
      startDate,
      endDate,
    })
    if (response.isFailure) {
      response.throwError()
      showError(response.errorMessage)
      return
    }
    return response.body
  }

  function handleMovementTypeSearchChange(movementType: string) {
    setMovementTypeSearch(movementType)
  }

  function handleStartDateChange(date: string) {
    setStartDate(date ? new Date(date) : undefined)
  }

  function handleEndDateChange(date: string) {
    setEndDate(date ? new Date(date) : undefined)
  }

  function handlePageChange(page: number) {
    setPage(page)
  }

  function handleEmployeeIdSerachChange(employeeId: string) {
    setEmployeIdSearch(employeeId)
  }

  const { data, isFetching } = useCache({
    fetcher: fetchInventoryMovements,
    key: CACHE.productInventoryMovements.key,
    dependencies: [page, movementTypeSearch, startDate, endDate],
  })

  const movements = data ? data.items.map(InventoryMovement.create) : []
  const itemsCount = data ? data.itemsCount : 0

  return {
    page,
    isFetching,
    movements,
    totalPages: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    itemsCount,
    movementTypeSearch,
    handleMovementTypeSearchChange,
    handleStartDateChange,
    handleEndDateChange,
    handlePageChange,
    handleEmployeeIdSerachChange,
    employeeIdSearch,
  }
}
