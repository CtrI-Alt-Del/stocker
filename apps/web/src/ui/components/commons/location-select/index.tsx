import { Accordion, AccordionItem, Button, Pagination, Spinner } from '@nextui-org/react'
import { motion } from 'framer-motion'

import { Icon } from '@/ui/components/commons/icon'
import { Select } from '@/ui/components/commons/select'
import { Dialog } from '../dialog'
import { useLocationSelect } from './use-location-select'

type LocationSelectProps = {
  defeaultLocationId?: string
  className?: string
  onSelectChange: (locationId: string) => void
  mode?: 'filter' | 'select'
}

export const LocationSelect = ({
  className,
  defeaultLocationId,
  onSelectChange,
  mode = 'select',
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
  } = useLocationSelect(onSelectChange, defeaultLocationId)

  return isFetching ? (
    <Spinner size='sm' className='w-full h-12 mx-auto' />
  ) : (
    <div className='space-y-2 flex gap-4 items-center'>
      <Dialog
        title='Selecione uma categoria ou subcategoria'
        size='2xl'
        trigger={
          <Select className={className}>
            {selectedLocationName ? selectedLocationName : 'Selecione setor ou local'}
          </Select>
        }
      >
        {(closeDrawer) => (
          <div className='flex flex-col h-[28rem] pb-6'>
            {locations.length === 0 && (
              <p className='text-center text-bg-zinc-600 font-semibold my-12'>
                Nenhum setor cadastrado.
              </p>
            )}
            {locations.length > 0 && (
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
                        location.subLocations.map((subLocation) => (
                          <div
                            key={subLocation.id}
                            className='flex flex-1 justify-between items-center ml-6'
                          >
                            <p>{subLocation.name}</p>
                            <Button
                              className='bg-transparent hover:bg-primary hover:text-white duration-1000 border-zinc-400 h-10 min-w-10'
                              onClick={() => {
                                handleLocationIdChange(subLocation.id)
                                closeDrawer()
                              }}
                            >
                              <Icon name='plus' size={18} />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p>Nenhum setor cadastrado para esse local</p>
                      )}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
            {totalPages > 1 && (
              <div className='flex flex-1 items-end '>
                <Pagination
                  page={page}
                  total={totalPages}
                  onChange={handleLocationPageChange}
                  aria-label='Paginação de categorias'
                  showControls
                />
              </div>
            )}
          </div>
        )}
      </Dialog>
      {selectedLocationName && mode === 'filter' && (
        <button
          type='button'
          onClick={() => handleLocationIdChange('')}
          className='flex justify-center items-center gap-2 text-xs text-gray-400'
        >
          Remover filtro
          <Icon name='close' className='size-4' />{' '}
        </button>
      )}
    </div>
  )
}
