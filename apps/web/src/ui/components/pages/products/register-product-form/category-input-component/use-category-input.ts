import { CACHE } from '@/constants'
import { useApi, useCache, useToast, useUrlParamNumber } from '@/ui/hooks'
import { ProductDto } from '@stocker/core/dtos'
import { Product } from '@stocker/core/entities'
import { useEffect, useState } from 'react'

export function useCategoryInput(productDto?: ProductDto) {
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
    dependencies: [page],
  })
  useEffect(() => {
    if (productDto && data) {
      const category = data.items.find(
        (category) => category.id === productDto.categoryId,
      )
      if (category) {
        setSelectedCategoryName(category.name || '')
      }
    }
  }, [productDto, data])
  function handlePageChange(page: number) {
    setPage(page)
  }
  const categories = data
    ? data.items.filter((category) => category.parentCategoryId !== null)
    : []
  const itemsCount = data ? data.itemsCount : 0
  return {
    isCategoryLoading: isFetching,
    totalCategoryPages: Math.ceil(itemsCount / 10),
    categoryPages: page,
    handleCategoryPageChange: handlePageChange,
    categories,
    selectedCategoryName,
    handleSelectCategoryNameChange,
  }
}
