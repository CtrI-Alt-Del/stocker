import { CACHE } from '@/constants'
import {
  useApi,
  useCache,
  useToast,
  useUrlParamNumber,
  useUrlParamString,
} from '@/ui/hooks'
import { Category } from '@stocker/core/entities'
import { useAuthContext } from '../../contexts/auth-context/hooks'
import { PAGINATION } from '@stocker/core/constants'

export function useCategoryPage() {
  const { categoriesService } = useApi()
  const [nameSearchValue, setNameSearchValue] = useUrlParamString('name')
  const { company } = useAuthContext()
  const { showError, showSuccess } = useToast()
  const [page, SetPage] = useUrlParamNumber('page', 1)

  async function fetchCategories() {
    if (!company) return
    const response = await categoriesService.listCategories({
      page,
      companyId: company?.id,
      name: nameSearchValue,
    })
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    return response.body
  }

  const { data, isFetching, refetch } = useCache({
    fetcher: fetchCategories,
    dependencies: [page, nameSearchValue],
    key: CACHE.categories.key,
  })
  function handleNameSearchChange(name: string) {
    setNameSearchValue(name)
  }
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
    nameSearchValue,
    page,
    totalPages: Math.ceil(totalItems / PAGINATION.itemsPerPage),
    categories,
    isFetching,
    handleNameSearchChange,
    handlePageChange,
    handleRegisterCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  }
}
