import { CACHE } from '@/constants'
import {
  useApi,
  useCache,
  useToast,
  useUrlParamDate,
  useUrlParamNumber,
} from '@/ui/hooks'
import { Product } from '@stocker/core/entities'
import { Datetime } from '@stocker/core/libs'
import { useEffect, useState } from 'react'

const DEFAULT_END_DATE = new Datetime()
const DEFAULT_START_DATE = DEFAULT_END_DATE.subtractDays(8)

export function useMostTrendingProductsTable() {
  const { reportsService } = useApi()
  const [startDate, setStartDate] = useUrlParamDate(
    'most-trending-products-start-date',
    DEFAULT_START_DATE,
  )
  const [endDate, setEndDate] = useUrlParamDate(
    'most-trending-products-end-date',
    DEFAULT_END_DATE.getDate(),
  )
  const [page, setPage] = useUrlParamNumber('most-trending-products-page', 1)
  const [datesDifference, setDatesDifference] = useState('')
  const { showError } = useToast()

  async function fetchProducts() {
    const response = await reportsService.reportMostTrendingProducts({
      startDate,
      endDate,
      page,
    })

    if (response.isFailure) {
      response.throwError()
      showError(response.errorMessage)
      return
    }

    return response.body
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

  const { data, isFetching } = useCache({
    fetcher: fetchProducts,
    key: CACHE.mostTrendingProducts.key,
    dependencies: [startDate, endDate, page],
  })

  const products = data?.items?.map(Product.create) ?? []
  const itemsCount = data?.itemsCount ?? 0
  const startDatetime = new Datetime(new Datetime(startDate).addDays(1))
  const endDatetime = new Datetime(endDate)

  useEffect(() => {
    function handleDatesDifferenceInYears() {
      const differenceInYears = endDatetime.differenceInYears(startDatetime.getDate())
      if (differenceInYears > 1) {
        setDatesDifference(`últimos ${differenceInYears} anos`)
        return
      }
      setDatesDifference('último ano')
      return
    }

    function handleDatesDifferenceInMonths() {
      const differenceInMonths = endDatetime.differenceInMonths(startDatetime.getDate())
      if (differenceInMonths > 12) {
        handleDatesDifferenceInYears()
        return
      }
      if (differenceInMonths > 1) {
        setDatesDifference(`últimos ${differenceInMonths} meses`)
        return
      }
      setDatesDifference('último mês')
    }

    function handleDatesDifferenceInDays() {
      const differenceInDays = endDatetime.differenceInDays(startDatetime.getDate())
      if (differenceInDays > 30) {
        handleDatesDifferenceInMonths()
        return
      }

      if (differenceInDays > 1) {
        setDatesDifference(`últimos ${differenceInDays} dias`)
        return
      }
      setDatesDifference('último dia')
    }

    handleDatesDifferenceInDays()
  }, [startDatetime, endDatetime])

  console.log({ itemsCount })

  return {
    products,
    isFetching,
    startDate: startDatetime,
    endDate: endDatetime,
    datesDifference,
    page,
    totalPages: Math.ceil(itemsCount / 5),
    handleStartDateChange,
    handleEndDateChange,
    handlePageChange,
  }
}
