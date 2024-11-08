import { CACHE } from '@/constants'
import { useApi, useCache, useToast, useUrlParamNumber } from '@/ui/hooks'
import { Category } from '@stocker/core/entities'
import { useAuthContext } from '../../contexts/auth-context/hooks'
import { PAGINATION } from '@stocker/core/constants'

export function useCategoryPage() {
  const { categoriesService } = useApi()
  const { company } = useAuthContext()
  const { showError, showSuccess } = useToast()
  const [page, SetPage] = useUrlParamNumber('page', 1)

  async function fetchCategories() {
    if (!company) return

    const response = await categoriesService.listCategories({
      page,
      companyId: company?.id,
    })
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

  function handleUpdateCategory() {
    refetch()
  }

  function handleRegisterCategory() {
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
  const categories = data ? data.items.map(Category.create) : []
  const totalItems = data ? data.itemsCount : 0

  return {
    page,
    totalPages: Math.ceil(totalItems / PAGINATION.itemsPerPage),
    categories,
    isFetching,
    handlePageChange,
    handleRegisterCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  }
}
