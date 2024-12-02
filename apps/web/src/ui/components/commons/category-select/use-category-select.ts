import { CACHE } from '@/constants'
import { useApi, useCache, useToast } from '@/ui/hooks'
import { Category } from '@stocker/core/entities'
import { useEffect, useState } from 'react'

export function useCategorySelect(
  onSelectChange: (categoryId: string) => void,
  isFilter: boolean,
  defeaultSelectedCategoryId?: string,
) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(defeaultSelectedCategoryId)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const { categoriesService } = useApi()
  const [page, setPage] = useState(1)
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})
  const { showError } = useToast()

  function handleCategoryIdChange(categoryId: string) {
    setSelectedCategoryId(categoryId)
    if (!categoryId) setSelectedCategory(null)
    onSelectChange(categoryId)
  }

  async function fetchCategories() {
    const response = await categoriesService.listCategories({
      page,
    })
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    return response.body
  }

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

  useEffect(() => {
    async function fetchSelectedCategory(selectedCategoryId: string) {
      const response = await categoriesService.getCategory(selectedCategoryId)
      if (response.isFailure) {
        setSelectedCategory(null)
        showError(response.errorMessage)
        return
      }
      if (selectedCategoryId) setSelectedCategory(Category.create(response.body))
    }

    if (isFilter && selectedCategoryId && !selectedCategory)
      fetchSelectedCategory(selectedCategoryId)
    else if (!isFilter && selectedCategoryId) fetchSelectedCategory(selectedCategoryId)
  }, [
    isFilter,
    selectedCategory,
    selectedCategoryId,
    categoriesService.getCategory,
    showError,
  ])

  return {
    isFetching,
    page,
    categories,
    totalPages: Math.ceil(itemsCount / 2),
    selectedCategoryName: selectedCategory?.name,
    expandedItems,
    handleCategoryIdChange,
    handleAccordionClick,
    handleCategoryPageChange: handlePageChange,
  }
}
