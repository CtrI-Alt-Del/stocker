"use client"
import { AllInventoryMovementsTable } from './inventory-movements-table'
import { useInventoryMovementPage } from './use-inventory-moviment'

export const InventoryMovementsPage = () => {
  const {
    isFetching,
    page,
    movements,
    totalPages,
    filterByNameValue,
    handlePageChange,
    handleSearchChange,
  } = useInventoryMovementPage()
  return (
    <>
      <div className=' flex space-y-2 flex-col'>
        <div className='flex justify-between'>
          <div className='flex-1 max-w-96 space-y-2'>
            <h1 className='text-3xl font-black'>Lançamentos</h1>
          </div>
        </div>
        <AllInventoryMovementsTable
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
