'use client'
import { Select, SelectItem } from '@nextui-org/react'
import { InventoryMovementsTable } from './inventory-movements-table'
import { useInventoryMovementPage } from './use-inventory-moviments-page'
import { EmployeeSelect } from '../../commons/employee-select'

export const InventoryMovementsPage = () => {
  const {
    handleEmployeeIdSerachChange,
    employeeIdSearch,
    isFetching,
    page,
    movements,
    totalPages,
    handlePageChange,
    handleMovementTypeSearchChange,
    movementTypeSearch,
  } = useInventoryMovementPage()

  return (
    <>
      <div className='flex space-y-2 flex-col'>
        <div className='flex justify-between'>
          <div className='flex-1  space-y-2'>
            <h1 className='text-3xl font-black'>Lançamentos</h1>
            <div className='flex md:flex-row flex=col items-center gap-4 w-full'>
              <Select
                className='max-w-60'
                size='lg'
                defaultSelectedKeys={['']}
                value={movementTypeSearch}
                onChange={(e) => handleMovementTypeSearchChange(e.target.value)}
              >
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
              <EmployeeSelect onSelectChange={handleEmployeeIdSerachChange} />
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
