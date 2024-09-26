import { CACHE } from '@/constants'
import { useApi, useCache, useToast } from '@/ui/hooks'
import { PAGINATION } from '@stocker/core/constants'
import { parseAsInteger, useQueryState } from 'nuqs'

export function useInventoryMovementPage() {
  const { inventoryMovementService } = useApi()
  const { showError } = useToast()
  const [pageState, setPage] = useQueryState('page', parseAsInteger)
  const [filterByNameValueState, setFilterByValueName] = useQueryState('name')
  const page = pageState ?? 1
  const filterByNameValue = filterByNameValueState ?? ''

  async function fetchInventoryMovements() {
    const response = await inventoryMovementService.listManyInventoryMovement(page)
    if (response.isFailure) {
      response.throwError()
      showError(response.errorMessage)
      return
    }
    return response.body
  }
  function handlePageChange(page: number) {
    setPage(page)
  }
  function handleSearchChange(value: string) {
    setFilterByValueName(value ?? '')
  }
  const { data, isFetching, refetch } = useCache({
    fetcher: fetchInventoryMovements,
    key: CACHE.inventoryMovements.key,
    dependencies: [page],
  })
  const movements = data ? data.items : []
  const itemsCount = data ? data.itemsCount : 0

  return {
    page,
    filterByNameValue,
    isFetching,
    movements,
    totalPages: Math.ceil(itemsCount/PAGINATION.itemsPerPage),
    itemsCount,
    handlePageChange,
    handleSearchChange,
    refetch,
  }
}
