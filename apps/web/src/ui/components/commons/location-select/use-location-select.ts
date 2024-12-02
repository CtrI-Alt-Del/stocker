import { useEffect, useState } from 'react'

import { Location } from '@stocker/core/entities'

import { useApi, useCache, useToast } from '@/ui/hooks'
import { CACHE } from '@/constants'

export function useLocationSelect(
  onSelectChange: (locationId: string) => void,
  isFilter: boolean,
  defaultSelectedLocationId: string | undefined,
) {
  const [selectedLocationId, setSelectedLocationId] = useState(defaultSelectedLocationId)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const { locationsService } = useApi()
  const [page, setPage] = useState(1)
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})
  const { showError } = useToast()

  function handleLocationIdChange(locationId: string) {
    if (!locationId && selectedLocation) setSelectedLocation(null)
    setSelectedLocationId(locationId)
    onSelectChange(locationId)
  }

  async function fetchLocations() {
    const response = await locationsService.listLocations({
      page,
    })
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    return response.body
  }

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

  function handlePageChange(page: number) {
    setPage(page)
  }

  const locations = locationsData ? locationsData.items.map(Location.create) : []
  const itemsCount = locationsData ? locationsData.itemsCount : 0

  useEffect(() => {
    async function fetchSelectedLocation(selectedLocationId: string) {
      const response = await locationsService.getLocation(selectedLocationId)
      if (response.isFailure) {
        setSelectedLocation(null)
        showError(response.errorMessage)
        return
      }
      if (selectedLocationId) setSelectedLocation(Location.create(response.body))
    }

    if (isFilter && selectedLocationId && !selectedLocation)
      fetchSelectedLocation(selectedLocationId)
    else if (!isFilter && selectedLocationId) fetchSelectedLocation(selectedLocationId)
  }, [
    isFilter,
    selectedLocation,
    selectedLocationId,
    locationsService.getLocation,
    showError,
  ])

  return {
    isFetching,
    page,
    locations,
    expandedItems,
    totalPages: Math.ceil(itemsCount / 10),
    selectedLocationName: selectedLocation?.name,
    handleLocationIdChange,
    handleAccordionClick,
    handleLocationPageChange: handlePageChange,
  }
}
