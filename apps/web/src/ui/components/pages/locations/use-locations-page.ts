import { useApi, useCache, useToast, useUrlParamNumber, useUrlParamString } from '@/ui/hooks'
import { useAuthContext } from '../../contexts/auth-context'
import { CACHE } from '@/constants'
import { Location } from '@stocker/core/entities'
import { PAGINATION } from '@stocker/core/constants'

export function useLocationsPage() {
  const [page, setPage] = useUrlParamNumber('page', 1)
  const { locationsService } = useApi()
  const [nameSearchvalue,setNameSearchValue] = useUrlParamString('name')
  const { showError, showSuccess } = useToast()
  const { user } = useAuthContext()
  function handleNameSearchChange(name:string){
    setNameSearchValue(name)
  }
  async function fetchLocations() {
    if (!user) return
    const response = await locationsService.listLocations({
      page,
      companyId: user.companyId,
      name: nameSearchvalue
    })
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    return response.body
  }
  const { data, isFetching, refetch } = useCache({
    fetcher: fetchLocations,
    dependencies: [page,nameSearchvalue],
    key: CACHE.locations.key,
  })
  function handlePageChange(page: number) {
    setPage(page)
  }
  function handleUpdateLocations() {
    refetch()
  }
  function handleRegisterLocation() {
    refetch()
  }
  async function handleDeleteLocation(locationId: string) {
    const response = await locationsService.deleteLocation(locationId)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    if (response.isSuccess) {
      refetch()
      showSuccess('Local deletado com sucesso')
    }
    refetch()
  }
  const locations = data ? data.items.map(Location.create) : []
  const totalItems = data ? data.itemsCount : 0
  return {
    page,
    totalPages: Math.ceil(totalItems / PAGINATION.itemsPerPage),
    locations,
    isFetching,
    handlePageChange,
    nameSearchvalue,
    handleNameSearchChange,
    handleRegisterLocation,
    handleUpdateLocations,
    handleDeleteLocation,
  }
}
