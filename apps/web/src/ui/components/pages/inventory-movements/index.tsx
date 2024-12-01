'use client'
import { Select, SelectItem } from '@nextui-org/react'
import { InventoryMovementsTable } from './inventory-movements-table'
import { useInventoryMovementPage } from './use-inventory-moviments-page'

export const InventoryMovementsPage = () => {
  const { isFetching, page, movements, totalPages, handlePageChange, handleMovementTypeSearchChange, movementTypeSearch, handleStartDateChange, handleEndDateChange, } =
    useInventoryMovementPage()

  return (
    <>
      <div className='flex space-y-2 flex-col'>
        <div className='flex justify-between'>
          <div className='flex-1 max-w-96 space-y-2'>
            <h1 className='text-3xl font-black'>Lançamentos</h1>
            <Select defaultSelectedKeys={['']} value={movementTypeSearch} onChange={(e) => handleMovementTypeSearchChange(e.target.value)}>
              <SelectItem key='' value=''>
                Todos
              </SelectItem>
              <SelectItem key='inbound' value='inbound'>
                Entrada
              </SelectItem>
              <SelectItem key='outbound' value='outbound'>
                Saida
              </SelectItem>
            </Select>
            <div className='flex gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Data Inicial</label>
                <input
                  type='date'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  onChange={(e) => handleStartDateChange(e.target.value)}
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Data Final</label>
                <input
                  type='date'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  onChange={(e) => handleEndDateChange(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <InventoryMovementsTable
          page={page}
          isLoading={isFetching}
          movements={movements}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}
