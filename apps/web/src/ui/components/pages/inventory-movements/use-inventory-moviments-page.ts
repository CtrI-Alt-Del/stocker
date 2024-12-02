import { CACHE } from '@/constants'
import {
  useApi,
  useCache,
  useToast,
  useUrlParamDate,
  useUrlParamNumber,
  useUrlParamString,
} from '@/ui/hooks'
import { PAGINATION } from '@stocker/core/constants'
import { InventoryMovement } from '@stocker/core/entities'
import { Datetime } from '@stocker/core/libs'
import type { InventoryMovementType } from '@stocker/core/types'
import { useState } from 'react'
const DEFAULT_END_DATE = new Datetime()
const DEFAULT_START_DATE = DEFAULT_END_DATE.subtractDays(365)
export function useInventoryMovementPage() {
  const { inventoryMovementService } = useApi()
  const { showError } = useToast()
  const [page, setPage] = useUrlParamNumber('page', 1)
  const [movementTypeSearch, setMovementTypeSearch] = useUrlParamString('type')
  const [startDate, setStartDate] = useUrlParamDate('start-date',DEFAULT_START_DATE)
  const [endDate, setEndDate] = useUrlParamDate('end-date',DEFAULT_END_DATE.getDate())
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

  function handleStartDateChange(date: Date) {
    setStartDate(date)
  }

  function handleEndDateChange(date: Date) {
    setEndDate(date)
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
    dependencies: [page, movementTypeSearch, startDate, endDate,employeeIdSearch],
  })

  const movements = data ? data.items.map(InventoryMovement.create) : []
  const itemsCount = data ? data.itemsCount : 0
  const startDateTime = new Datetime(new Datetime(startDate).addDays(1))
  const endDatetime = new Datetime(new Datetime(endDate).addDays(1))

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
    startDate: startDateTime,
    endDate: endDatetime,
    handlePageChange,
    handleEmployeeIdSerachChange,
    employeeIdSearch,
  }
}
