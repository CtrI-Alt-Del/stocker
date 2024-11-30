import { Accordion, AccordionItem, Button, Pagination, Spinner } from '@nextui-org/react'
import { motion } from 'framer-motion'

import { Icon } from '@/ui/components/commons/icon'
import { Select } from '@/ui/components/commons/select'
import { Dialog } from '../dialog'
import { useLocationSelect } from './use-location-select'

type LocationSelectProps = {
  defaultLocationId?: string
  className?: string
  onSelectChange: (locationId: string) => void
  mode?: 'filter' | 'select'
}

export const LocationSelect = ({
  className,
  mode = 'select',
  defaultLocationId,
  onSelectChange,
}: LocationSelectProps) => {
  const {
    locations,
    isFetching,
    page,
    totalPages,
    selectedLocationName,
    expandedItems,
    handleLocationIdChange,
    handleAccordionClick,
    handleLocationPageChange,
  } = useLocationSelect(onSelectChange, defaultLocationId || '')

  return isFetching ? (
    <Spinner size='sm' className='w-full h-full mx-auto' />
  ) : (
    <div className='space-y-2 gap-4 flex flex-row w-full flex-1'>
      <Dialog
        title='Selecione um local ou setor'
        size='2xl'
        trigger={
          <Select className={className}>
            {selectedLocationName ? selectedLocationName : 'Selecione local'}
          </Select>
        }
      >
        {(closeDrawer) =>
          locations.length === 0 ? (
            <p className='text-center text-bg-zinc-600 font-semibold my-12'>
              Nenhum local registrado.
            </p>
          ) : (
            <>
              <Accordion selectionMode='multiple'>
                {locations.map((location) => (
                  <AccordionItem
                    indicator={
                      <Button
                        className='bg-transparent hover:bg-primary hover:text-white duration-1000 border-zinc-400 h-10 min-w-10'
                        onClick={() => {
                          handleLocationIdChange(location.id)
                          closeDrawer()
                        }}
                      >
                        <Icon name='plus' size={18} />
                      </Button>
                    }
                    key={location.id}
                    title={location.name}
                    disableIndicatorAnimation
                    startContent={
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: expandedItems[location.id] ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon name='arrow-up' size={18} className='rotate-90' />
                      </motion.div>
                    }
                    onClick={() => handleAccordionClick(location.id)}
                  >
                    <div className='flex gap-1 flex-col sm:ml-4 ml-0 -translate-y-3'>
                      {location.subLocations.length > 0 ? (
                        location.subLocations.map((sector) => (
                          <div
                            key={sector.id}
                            className='flex flex-1 justify-between items-center ml-6'
                          >
                            <p>{sector.name}</p>
                            <Button
                              className='bg-transparent hover:bg-primary hover:text-white duration-1000 border-zinc-400 h-10 min-w-10'
                              onClick={() => {
                                handleLocationIdChange(sector.id)
                                closeDrawer()
                              }}
                            >
                              <Icon name='plus' size={18} />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p>Nenhum setor cadastrado</p>
                      )}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
              {totalPages !== 1 && (
                <Pagination
                  page={page}
                  total={totalPages}
                  onChange={handleLocationPageChange}
                  aria-label='K.F esteve aqui!!!'
                  showControls
                />
              )}
            </>
          )
        }
      </Dialog>
      {selectedLocationName && mode === 'filter' && (
        <button
          type='button'
          onClick={() => handleLocationIdChange('')}
          className='flex justify-center items-center gap-2 text-sm text-gray-400'
        >
          Remover Filtro
          <Icon name='close' className='size-4' />{' '}
        </button>
      )}
    </div>
  )
}
