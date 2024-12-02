'use client'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { InventoryMovementsTable } from './inventory-movements-table'
import { useInventoryMovementPage } from './use-inventory-moviments-page'
import { EmployeeSelect } from '../../commons/employee-select'
import { Datetime } from '@stocker/core/libs'

export const InventoryMovementsPage = () => {
  const {
    isFetching,
    page,
    movements,
    totalPages,
    movementTypeSearch,
    handlePageChange,
    handleMovementTypeSearchChange,
    handleStartDateChange,
    handleEndDateChange,
    handleEmployeeIdSerachChange,
    startDate,
    endDate,
  } = useInventoryMovementPage()

  return (
    <>
      <div className='flex space-y-2 flex-col'>
        <div className='flex justify-between'>
          <div className='flex-1  space-y-2'>
            <h1 className='text-3xl font-black'>Lançamentos</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 max-w-3xl gap-8'>
              <Select
                className='w-full md:w-64'
                label='Tipo de lançamento'
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
              <EmployeeSelect className='w-full md:w-64' onSelectChange={handleEmployeeIdSerachChange} />
              <div className='flex gap-4 items-center flex-col md:flex-row'>
                <Input
                  label='Data inicial'
                  type='date'
                  size='sm'
                  value={startDate.format('YYYY-MM-DD')}
                  className='w-full'
                  onChange={({ target }) =>
                    handleStartDateChange(new Datetime(new Date(target.value)).addDays(1))
                  }
                />
                <Input
                  label='Data final'
                  size='sm'
                  value={endDate.format('YYYY-MM-DD')}
                  type='date'
                  className='w-full'
                  onChange={({ target }) =>
                    handleEndDateChange(new Datetime(new Date(target.value)).addDays(1))
                  }
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
