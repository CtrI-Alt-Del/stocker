import { CACHE } from '@/constants'
import { useApi, useCache, useToast } from '@/ui/hooks'
import { Category } from '@stocker/core/entities'
import { useState } from 'react'

export function useCategorySelect(
  onSelectChange: (categoryId: string) => void,
  defeaultSelectedCategoryId?: string,
) {
  const [categoryId, setCategoryId] = useState(defeaultSelectedCategoryId)
  const { categoriesService } = useApi()
  const [page, setPage] = useState(1)
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})
  const { showError } = useToast()

  function handleCategoryIdChange(categoryId: string) {
    setCategoryId(categoryId)
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

  console.log(categoriesData)

  return {
    isFetching,
    page,
    categories,
    totalPages: Math.ceil(itemsCount / 2),
    selectedCategoryName: categories.find((category) => category.id === categoryId)?.name,
    expandedItems,
    handleCategoryIdChange,
    handleAccordionClick,
    handleCategoryPageChange: handlePageChange,
  }
}
