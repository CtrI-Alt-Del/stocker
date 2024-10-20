import { CACHE } from '@/constants'
import { useApi, useCache, useToast, useUrlParamString } from '@/ui/hooks'

export function useWeeklyInventoryMovementsChart() {
  const [productId, setProductId] = useUrlParamString('weekly-inventory-product', '')
  const { reportsService } = useApi()
  const { showError } = useToast()

  async function fetchWeeklyInventoryMovements() {
    const response = await reportsService.reportWeeklyInventoryMovements(productId)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    return response.body
  }

  const { data, isFetching } = useCache({
    fetcher: fetchWeeklyInventoryMovements,
    key: CACHE.weeklyInventoryMovements.key,
    dependencies: [productId ?? undefined],
  })

  function handleProductIdChange(productId: string) {
    setProductId(productId)
  }

  return {
    data: data ?? [],
    productId,
    isFetching,
    handleProductIdChange,
  }
}
