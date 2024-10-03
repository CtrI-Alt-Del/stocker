import { CACHE } from '@/constants'
import { useApi, useCache } from '@/ui/hooks'

export function useStockLevelChart() {
  const { reportsService } = useApi()

  async function fetchStockLevel() {
    const response = await reportsService.reportStockLevel()
    return response.body
  }

  const { data, isFetching } = useCache({
    fetcher: fetchStockLevel,
    key: CACHE.stockLevel.key,
  })

  const stockLevel = data
    ? [
        { name: 'Acima do minimo', value: data.safe },
        { name: 'Abaixo do minimo', value: data.average },
        { name: 'Esgotado', value: data.danger },
      ]
    : null
  const totalProducts = data ? data.safe + data.average + data.danger : 0

  return { data: stockLevel, isFetching, totalProducts }
}
