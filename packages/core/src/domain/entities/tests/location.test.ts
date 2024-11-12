import { describe, expect, it } from 'vitest'
import { Location } from '../location'
import type { LocationDto } from '../../../dtos/location-dto'

describe('Location entity', () => {
  it('should be created with valid DTO', () => {
    const locationDto: LocationDto = {
      id: '1',
      name: 'banana',
      companyId: 'company BananaLtda',
      subLocations: [],
    }

    const location = Location.create(locationDto)

    expect(location.dto).toEqual(locationDto)
  })

  it('should update location details', () => {
    const locationDto: LocationDto = {
      id: '1',
      name: 'banana',
      companyId: 'company BananaLtda',
      subLocations: [],
    }

    const location = Location.create(locationDto)
    const updatedLocation = location.update({ name: 'banana updated' })
    expect(updatedLocation.name).toEqual('banana updated')
    expect(updatedLocation.dto.companyId).toEqual(location.dto.companyId)
  })

  it('should return the correct DTO after update', () => {
    const locationDto: LocationDto = {
      id: '1',
      name: 'banana',
      companyId: 'company BananaLtda',
      subLocations: [],
    }

    const location = Location.create(locationDto)
    const updatedLocation = location.update({ name: 'banana updated' })

    expect(updatedLocation.dto.name).toEqual('banana updated')
    expect(updatedLocation.dto.companyId).toEqual(location.dto.companyId)
  })
})
