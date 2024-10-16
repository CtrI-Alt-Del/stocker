import { CACHE } from '@/constants'
import { useApi, useCache, useToast, useUrlParamNumber } from '@/ui/hooks'
import { useState } from 'react'

export function useCategoryInput() {
  const { categoriesService } = useApi()
  const { showError } = useToast()
  const [page, setPage] = useUrlParamNumber('categoryPage', 1)
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('')
  async function fetchCategories() {
    const response = await categoriesService.listCategories({ page })
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    return response.body
  }
  function handleSelectCategoryNameChange(categoryName: string) {
    setSelectedCategoryName(categoryName)
  }
  const { data, isFetching, refetch } = useCache({
    fetcher: fetchCategories,
    key: CACHE.categories.key,
  })
  function handlePageChange(page: number) {
    setPage(page)
  }
  const categories = data
    ? data.items.filter((category) => category.parentCategoryId !== null)
    : []
  const itemsCount = data ? data.itemsCount : 0
  return {
    totalCategoryPages: Math.ceil(itemsCount / 10),
    categoryPages: page,
    handleCategoryPageChange: handlePageChange,
    categories,
    isFetching,
    selectedCategoryName,
    handleSelectCategoryNameChange
  }
}
