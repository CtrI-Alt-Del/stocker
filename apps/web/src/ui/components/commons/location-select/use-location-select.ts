import { useState } from 'react'

import { Location } from '@stocker/core/entities'

import { useApi, useCache, useToast } from '@/ui/hooks'
import { CACHE } from '@/constants'

export function useLocationSelect(
  onSelectChange: (locationId: string) => void,
  defaultSelectedLocationId: string | undefined,
) {
  const { locationsService } = useApi()
  const { showError } = useToast()
  const [page, setPage] = useState(1)
  const [locationId, setLocationId] = useState(defaultSelectedLocationId)
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})

  function handleLocationIdChange(locationId: string) {
    setLocationId(locationId)
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

  return {
    isFetching,
    page,
    locations,
    expandedItems,
    totalPages: Math.ceil(itemsCount / 10),
    selectedLocationName: locations.find((category) => category.id === locationId)?.name,
    handleLocationIdChange,
    handleAccordionClick,
    handleLocationPageChange: handlePageChange,
  }
}
