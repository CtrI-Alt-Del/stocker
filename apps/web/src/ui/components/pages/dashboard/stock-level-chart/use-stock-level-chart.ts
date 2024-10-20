import { CACHE } from '@/constants'
import { useApi, useCache } from '@/ui/hooks'
import { StockLevelReport } from '@stocker/core/structs'

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

  const stockLevelReport = data ? StockLevelReport.create(data) : null

  const stockLevel = data
    ? [
        { name: 'Acima do minimo', value: stockLevelReport?.safe },
        { name: 'Abaixo do minimo', value: stockLevelReport?.average },
        { name: 'Esgotado', value: stockLevelReport?.danger },
      ]
    : null

  return {
    data: stockLevel,
    stockLevelReport,
    isFetching,
  }
}
