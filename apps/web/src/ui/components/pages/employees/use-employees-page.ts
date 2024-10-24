import { useToast, useUrlParamNumber } from '@/ui/hooks'
import { UsersFaker } from '@stocker/core/fakers'

export function useEmployeesPage() {
  const { showSuccess, showError } = useToast()
  const [page, setPage] = useUrlParamNumber('page', 1)

  function handlePageChange(page: number) {
    setPage(page)
  }
  // THIS HERE GENERATES A ERROR SINCE ITS MOCK DATA IN CLIENT SIDE!!!! BUT ITS TEMPORARY SO WHATEVER
  const tempoUser = UsersFaker.fakeMany()
  const isLoading = false
  const totalPages = 11
  return {
    totalPages: Math.ceil(totalPages / 10),
    page,
    handlePageChange,
    tempoUser,
    isLoading,
  }
}
