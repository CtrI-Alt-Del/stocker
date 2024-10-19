import { CACHE } from '@/constants'
import { useApi, useCache, useToast, useUrlParamNumber } from '@/ui/hooks'

export function useCategoryPage() {
  const { categoriesService } = useApi()
  const { showError, showSuccess } = useToast()
  const [page, SetPage] = useUrlParamNumber('page', 1)
  async function fetchCategories() {
    const response = await categoriesService.listCategories({ page })
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    return response.body
  }
  const { data, isFetching, refetch } = useCache({
    fetcher: fetchCategories,
    dependencies: [page],
    key: CACHE.categories.key,
  })
  function handlePageChange(page: number) {
    SetPage(page)
  }
  function handleUpdateCategory(){
    refetch()
  }
  function handleRegisterCategory(){
    refetch()
  }
  async function handleDeleteCategory(categoryId: string) {
    const response = await categoriesService.deleteCategory(categoryId)
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    if (response.isSuccess) {
      refetch()
      showSuccess('Categoria deletada com sucesso')
      return
    }
  }
  const categories = data
    ? data.items
    : []
  const totalItems = data ? data.itemsCount : 0
  return {
    handlePageChange,
    totalPages: Math.ceil(totalItems / 10),
    page,
    handleRegisterCategory,
    categories,
    isFetching,
    handleUpdateCategory,
    handleDeleteCategory,
  }
}
