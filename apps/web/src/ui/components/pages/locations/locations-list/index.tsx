import type { DrawerRef } from '@/ui/components/commons/drawer/types'
import { motion } from 'framer-motion'
import type { Location } from '@stocker/core/entities'
import { useRef } from 'react'
import { useLocationsList } from './use-locations-list'
import { Accordion, AccordionItem, Button, Pagination, Spinner } from '@nextui-org/react'
import { Icon } from '@/ui/components/commons/icon'
import { AlertDialog } from '@/ui/components/commons/alert-dialog'
import { Drawer } from '@/ui/components/commons/drawer'
import { RegisterLocationForm } from '../register-location-form'
import { UpdateLocationForm } from '../update-location-form'

type LocationListProps = {
  locations: Location[]
  totalItems: number
  page: number
  isFetching: boolean
  handlePageChange: (page: number) => void
  handleUpdateLocations: VoidFunction
  handleDeleteLocation: (categoryId: string) => void
  handleRegisterLocation: VoidFunction
}
export const LocationList = ({
  locations,
  totalItems,
  page,
  handleDeleteLocation,
  handlePageChange,
  handleUpdateLocations,
  handleRegisterLocation: handleRegisterCategory,
  isFetching,
}: LocationListProps) => {
  const updateDrawerRef = useRef<DrawerRef>(null)
  const registerDrawerRef = useRef<DrawerRef>(null)
  const {
    locationBeingEditted,
    parentLocationId,
    expandedItems,
    handleAccordionClick,
    handleEditLocationsButtonClick,
    handleUpdateLocationFormSubmit,
    handleCancelEditting,
    handleDrawerClose,
    handleRegisterSectorFormSubmit,
    handleRegisterSectorButtonClick,
  } = useLocationsList({
    registerDrawerRef,
    locations,
    updateDrawerRef,
    onUpdateLocation: handleUpdateLocations,
    onRegisterSector: handleRegisterCategory,
  })

  return (
    <div>
      {isFetching ? (
        <div>
          <Spinner label='Carregando...' className='w-full h-full mx-auto' />
        </div>
      ) : locations.length === 0 ? (
        <p className='text-center font-semibold mt-12'>Nenhum Local Encontrado</p>
      ) : (
        <div className='space-y-2'>
          <Accordion selectionMode='multiple'>
            {locations.map((location) => (
              <AccordionItem
                key={location.id}
                aria-label={location.name}
                startContent={
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: expandedItems[location.id] ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon name='arrow-up' size={18} className='rotate-90' />
                  </motion.div>
                }
                hideIndicator
                title={
                  <div className='flex justify-between w-full items-center gap-2'>
                    <p className='text-sm '>{location.name}</p>
                    <div className='flex space-x-2'>
                      <div className='flex space-x-2 m-0'>
                        <Button
                          size='sm'
                          className='bg-transparent hover:bg-primary text-gray-700 hover:text-white duration-1000 border-zinc-400 min-w-10'
                          onClick={() => handleRegisterSectorButtonClick(location.id)}
                        >
                          <Icon name='plus' size={18} />
                        </Button>
                        <Button
                          size='sm'
                          onClick={() => handleEditLocationsButtonClick(location)}
                          className='bg-transparent hover:bg-primary text-gray-700 hover:text-white duration-1000 border-zinc-400 min-w-10'
                        >
                          <Icon name='pencil' size={18} />
                        </Button>
                        <AlertDialog
                          trigger={
                            <Button
                              size='sm'
                              className='bg-transparent hover:bg-primary text-gray-700 hover:text-white hover:transition-all transition-all duration-1000 border-zinc-400 h-10 min-w-10'
                            >
                              <Icon name='trash' size={18} />
                            </Button>
                          }
                          onConfirm={() => {
                            handleDeleteLocation(location.id)
                          }}
                        >
                          Você tem certeza que deseja deletar essa categoria?
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                }
                onClick={() => handleAccordionClick(location.id)}
              >
                <div className='flex gap-1 flex-col sm:ml-4 ml-0'>
                  {location.subLocations.length > 0 ? (
                    location.subLocations.map((subLocation) => (
                      <div
                        key={subLocation.id}
                        className='flex justify-between items-center'
                      >
                        <p className='text-sm'>{subLocation.name}</p>
                        <div className='flex gap-2'>
                          <Button
                            size='sm'
                            className='bg-transparent hover:bg-primary text-gray-700 hover:text-white duration-1000 border-zinc-400 min-w-10'
                            onClick={() => handleEditLocationsButtonClick(subLocation)}
                          >
                            <Icon name='pencil' size={18} />
                          </Button>
                          <AlertDialog
                            trigger={
                              <Button
                                size='sm'
                                className='bg-transparent hover:bg-primary text-gray-700 hover:text-white hover:transition-all transition-all duration-1000 border-zinc-400 h-9 min-w-8'
                              >
                                <Icon name='trash' size={18} />
                              </Button>
                            }
                            onConfirm={() => {
                              handleDeleteLocation(subLocation.id)
                            }}
                          >
                            Você tem certeza que deseja deletar esss setor?
                          </AlertDialog>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className='text-sm'>Sem setores</p>
                  )}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
          {totalItems > 1 && (
            <Pagination page={page} onChange={handlePageChange} total={totalItems} />
          )}
        </div>
      )}
      <Drawer ref={registerDrawerRef} trigger={null} onClose={handleDrawerClose}>
        {() =>
          parentLocationId && (
            <RegisterLocationForm
              parentLocationId={parentLocationId}
              onSubmit={handleRegisterSectorFormSubmit}
              onCancel={handleCancelEditting}
            />
          )
        }
      </Drawer>
      <Drawer ref={updateDrawerRef} trigger={null} onClose={handleDrawerClose}>
        {() =>
          locationBeingEditted && (
            <UpdateLocationForm
              location={locationBeingEditted}
              onSubmit={handleUpdateLocationFormSubmit}
              onCancel={handleCancelEditting}
            />
          )
        }
      </Drawer>
    </div>
  )
}
