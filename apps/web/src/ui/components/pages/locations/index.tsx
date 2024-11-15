'use client'

import { Button } from '@nextui-org/react'
import { Search } from '../../commons/search'
import { Drawer } from '../../commons/drawer'
import { RegisterLocationForm } from './register-location-form'
import { useLocationsList } from './locations-list/use-locations-list'
import { useLocationsPage } from './use-locations-page'
import { LocationList } from './locations-list'

export const LocationsPage = () => {
  const {
    locations,
    totalPages,
    page,
    isFetching,
    handlePageChange,
    handleDeleteLocation,
    handleUpdateLocations,
    handleRegisterLocation,
  } = useLocationsPage()
  return (
    <div>
      <div className='flex flex-col gap-3 md:flex-row md:gap-0 justify-between'>
        <div className='flex-1 w-full max-w-96 space-y-2'>
          <h1 className='text-3xl font-black'>Setores</h1>
          <Search />
        </div>

        <div className='flex items-center gap-1'>
          <Drawer
            trigger={
              <Button variant='solid' color='primary' radius='sm'>
                Adicionar Local
              </Button>
            }
          >
            {(closeDrawer) => (
              <RegisterLocationForm
                onSubmit={async () => {
                  await handleRegisterLocation()
                  closeDrawer()
                }}
                onCancel={closeDrawer}
              />
            )}
          </Drawer>
        </div>
      </div>
      <div className='mt-4'>
        <LocationList
          page={page}
          locations={locations}
          isFetching={isFetching}
          totalItems={totalPages}
          handleRegisterLocation={handleRegisterLocation}
          handleUpdateLocations={handleUpdateLocations}
          handleDeleteLocation={handleDeleteLocation}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
