import { useApi, useCache, useToast, useUrlParamNumber } from '@/ui/hooks'
import { useState } from 'react'
import { useAuthContext } from '../../contexts/auth-context'
import { CACHE } from '@/constants'
import { Location } from '@stocker/core/entities'

export function useLocationSelect(
  onSelectChange: (locationId: string) => void,
  defaultSelectedLocationId: string,
) {
  const [locationId, setLocationId] = useState(defaultSelectedLocationId)
  const { locationsService } = useApi()
  const { showError } = useToast()
  const { company } = useAuthContext()
  const [page, setPage] = useUrlParamNumber('locationPage', 1)
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})
  function handleLocationIdChange(locationId: string) {
    setLocationId(locationId)
    onSelectChange(locationId)
  }
  async function fetchLocation() {
    if (!locationId) return
    const response = await locationsService.getLocation(locationId)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    return response.body
  }
  async function fetchLocations() {
    if (!company) return
    const response = await locationsService.listLocations({
      page,
      companyId: company.id,
    })
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    return response.body
  }
  const { data: locationData } = useCache({
    fetcher: fetchLocation,
    key: CACHE.locations.key,
    dependencies: [locationId],
  })
  const { data: locationsData, isFetching } = useCache({
    fetcher: fetchLocations,
    key: CACHE.locations.key,
    dependencies: [page],
  })
  function handleAccordionClick(id: string) {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }
  function handlePageChange(page:number){
    setPage(page)
  } 
  const locations = locationsData ? locationsData.items.map(Location.create) : []
  const itemsCount = locationsData ? locationsData.itemsCount : 0
  const selectedLocationName = locationId ? locationData?.name : null
    return {
    isFetching,
    totalPages: Math.ceil(itemsCount / 10),
    page,
    locations,
    selectedLocationName: locationData?.name,
    expandedItems,
    handleLocationIdChange,
    handleAccordionClick,
    handleLocationPageChange: handlePageChange,
  }

}
