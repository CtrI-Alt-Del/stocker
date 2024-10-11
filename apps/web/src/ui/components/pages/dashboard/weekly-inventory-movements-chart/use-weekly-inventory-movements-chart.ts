import { CACHE } from '@/constants'
import { useApi, useCache, useToast, useUrlParamString } from '@/ui/hooks'

export function useWeeklyInventoryMovementsChart() {
  const [productId, setProductId] = useUrlParamString('weekly-inventory-product', '')
  const { reportsService, productsService } = useApi()
  const { showError, showSuccess } = useToast()
  async function fetchWeeklyInventoryMovements() {
    const response = await reportsService.reportWeeklyInventoryMovements(productId)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    return response.body
  }

  const { data, isFetching, refetch } = useCache({
    fetcher: fetchWeeklyInventoryMovements,
    key: CACHE.weeklyInventoryMovements.key,
    dependencies: [productId],
  })
  function handleProductIdChange(id: string) {
    setProductId(id ? id : '')
    if (id) {
      refetch()
    }
  }
  async function fetchProduct() {
    const response = await productsService.getProduct(productId)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    return response.body
  }
  const { data: productData } = useCache({
    fetcher: fetchProduct,
    key: CACHE.productsList.key,
    dependencies: [productId],
  })
  console.log(data)
  return {
    weeklyMovements: data,
    productId,
    handleProductIdChange,
    productName: productData?.name || '',
    isFetching,
  }
}
