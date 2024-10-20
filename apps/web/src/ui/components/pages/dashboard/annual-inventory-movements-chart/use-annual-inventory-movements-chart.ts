import { CACHE } from '@/constants'
import { useApi, useCache, useToast, useUrlParamString } from '@/ui/hooks'

export function useAnnualInventoryMovementChart() {
  const [productId, setProductId] = useUrlParamString('annual-inventory-product', '')
  const { reportsService } = useApi()
  const { showError } = useToast()

  async function fetchAnualInventoryMovements() {
    const response = await reportsService.reportAnualInventoryMovements(productId)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    return response.body
  }

  const { data, isFetching } = useCache({
    fetcher: fetchAnualInventoryMovements,
    key: CACHE.anualInventoryMovements.key,
    dependencies: [productId ?? undefined],
  })

  function handleProductIdChange(selectedProductId: string) {
    setProductId(selectedProductId)
  }

  const annualMovements = data
    ? data.map((movement) => ({
        ...movement,
        month: movement.month.charAt(0).toUpperCase() + movement.month.slice(1, 3),
      }))
    : []

  return {
    data: annualMovements,
    productId,
    annualMovements,
    isFetching,
    handleProductIdChange,
  }
}
