import { CACHE } from '@/constants'
import { useApi, useCache, useToast } from '@/ui/hooks'
import { PAGINATION } from '@stocker/core/constants'
import { parseAsInteger, useQueryState } from 'nuqs'

export function useInventoryMovementPage() {
  const { inventoryMovementService } = useApi()
  const { showError } = useToast()
  const [pageState, setPage] = useQueryState('page', parseAsInteger)
  const page = pageState ?? 1

  async function fetchInventoryMovements() {
    const response = await inventoryMovementService.listInventoryMovements({
      page,
      productId: 'all',
    })
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

  const { data, isFetching } = useCache({
    fetcher: fetchInventoryMovements,
    key: CACHE.inventoryMovements.key,
    dependencies: [page],
  })
  const movements = data ? data.items : []
  const itemsCount = data ? data.itemsCount : 0

  console.log(data)

  return {
    page,
    isFetching,
    movements,
    totalPages: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    itemsCount,
    handlePageChange,
  }
}
