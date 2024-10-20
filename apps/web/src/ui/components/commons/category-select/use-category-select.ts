import { CACHE } from '@/constants'
import { useApi, useCache, useToast, useUrlParamNumber } from '@/ui/hooks'
import { Category } from '@stocker/core/entities'
import { useEffect, useState } from 'react'

export function useCategorySelect(defeaultSelectedCategoryId?: string) {
  const { categoriesService } = useApi()
  const { showError } = useToast()
  const [page, setPage] = useUrlParamNumber('categoryPage', 1)
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('')
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})

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

  const { data, isFetching } = useCache({
    fetcher: fetchCategories,
    key: CACHE.categories.key,
    dependencies: [page],
  })

  useEffect(() => {
    if (data) {
      const category = data.items.find(
        (category) => category.id === defeaultSelectedCategoryId,
      )

      if (!category) {
        for (const cattegory of data.items) {
          const subCategory = cattegory.subCategories?.find(
            (subCategory) => subCategory.id === defeaultSelectedCategoryId,
          )
          if (subCategory) {
            setSelectedCategoryName(subCategory.name || '')
            return
          }
        }
      } else {
        setSelectedCategoryName(category.name || '')
      }
    }
  }, [data, defeaultSelectedCategoryId])

  function handlePageChange(page: number) {
    setPage(page)
  }

  function handleAccordionClick(id: string) {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const categories = data ? data.items.map(Category.create) : []
  const itemsCount = data ? data.itemsCount : 0

  return {
    isFetching,
    totalPages: Math.ceil(itemsCount / 10),
    page,
    categories,
    selectedCategoryName,
    expandedItems,
    handleAccordionClick,
    handleCategoryPageChange: handlePageChange,
    handleSelectCategoryNameChange,
  }
}
