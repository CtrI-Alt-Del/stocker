import { CACHE } from '@/constants'
import { useApi, useCache, useToast, useUrlParamNumber } from '@/ui/hooks'
import { Category } from '@stocker/core/entities'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/auth-context'

export function useCategorySelect(
  onSelectChange: (categoryId: string) => void,
  defeaultSelectedCategoryId?: string,
) {
  const [categoryId, setCategoryId] = useState(defeaultSelectedCategoryId)
  const { categoriesService } = useApi()
  const { company } = useAuthContext()
  const { showError } = useToast()
  const [page, setPage] = useUrlParamNumber('categoryPage', 1)
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})

  function handleCategoryIdChange(categoryId: string) {
    setCategoryId(categoryId)
    onSelectChange(categoryId)
  }

  async function fetchCategory() {
    if (!categoryId) return

    const response = await categoriesService.getCategory(categoryId)
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    return response.body
  }

  async function fetchCategories() {
    if (!company) return

    const response = await categoriesService.listCategories({
      page,
      companyId: company.id,
    })
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    return response.body
  }

  const { data: categoryData } = useCache({
    fetcher: fetchCategory,
    key: CACHE.category.key,
    dependencies: [categoryId],
  })

  const { data: categoriesData, isFetching } = useCache({
    fetcher: fetchCategories,
    key: CACHE.categories.key,
    dependencies: [page],
  })

  function handlePageChange(page: number) {
    setPage(page)
  }

  function handleAccordionClick(id: string) {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const categories = categoriesData ? categoriesData.items.map(Category.create) : []
  const itemsCount = categoriesData ? categoriesData.itemsCount : 0

  return {
    isFetching,
    totalPages: Math.ceil(itemsCount / 10),
    page,
    categories,
    selectedCategoryName: categoryData?.name,
    expandedItems,
    handleCategoryIdChange,
    handleAccordionClick,
    handleCategoryPageChange: handlePageChange,
  }
}
