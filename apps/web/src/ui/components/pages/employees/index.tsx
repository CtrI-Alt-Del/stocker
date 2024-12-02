'use client'

import { Button, Select, SelectItem } from '@nextui-org/react'

import { Drawer } from '../../commons/drawer'
import { Search } from '../../commons/search'
import { EmployeesTable } from './employees-table'
import { RegisterEmployeeForm } from './register-employee-form'
import { useEmployeesPage } from './use-employees-page'
import { AlertDialog } from '../../commons/alert-dialog'

export const EmployeesPage = () => {
  const {
    page,
    totalPages,
    isDeleting,
    users,
    selectedEmployeesIds,
    isLoading,
    nameSearchValue,
    roleSearchValue,
    handleRegisterEmployeeFormSubmit,
    handleUpdateEmployee,
    handleEmployeesSelectionChange,
    handlePageChange,
    handleDeleteEmployeesAlertDialogConfirm,
    handleNameSearchChange,
    handleRoleSearchChange,
  } = useEmployeesPage()
  return (
    <>
      <div className='space-y-5'>
        <div className='flex flex-col gap-3 md:flex-row md:gap-0 justify-between'>
          <div className='flex-1 w-full   space-y-2'>
            <h1 className='text-3xl font-black'>Funcionários</h1>
            <div className=' flex md:items-center flex-col md:flex-row gap-4 w-full'>
              <Search value={nameSearchValue} onSearchChange={handleNameSearchChange} />
              <Select
                className='max-w-96'
                color='default'
                size='md'
                label='Cargo'
                defaultSelectedKeys={['']}
                value={roleSearchValue}
                onChange={(e) => handleRoleSearchChange(e.target.value)}
              >
                <SelectItem key='' value=''>
                  Todos
                </SelectItem>
                <SelectItem key='employee' value='employee'>
                  Funcionário
                </SelectItem>
                <SelectItem key='manager' value='manager'>
                  Gerente
                </SelectItem>
              </Select>
            </div>
          </div>
          <div className='flex items-center justify-center gap-1'>
            {selectedEmployeesIds.length > 0 && (
              <AlertDialog
                trigger={
                  <Button color='danger' isLoading={isDeleting}>
                    Deletar funcionários
                  </Button>
                }
                onConfirm={handleDeleteEmployeesAlertDialogConfirm}
              >
                {selectedEmployeesIds.length <= 1
                  ? 'Voce tem certeza que deseja deletar esse funcionários?'
                  : 'Voce tem certeza que deseja deletar esses funcionários?'}
              </AlertDialog>
            )}
            <Drawer
              trigger={
                <Button variant='solid' color='primary' size='md' className='text-orange'>
                  <span className='text-white'>Adicionar Funcionário</span>
                </Button>
              }
            >
              {(closeDrawer) => (
                <RegisterEmployeeForm
                  onSubmit={async () => {
                    await handleRegisterEmployeeFormSubmit()
                    closeDrawer()
                  }}
                  onCancel={closeDrawer}
                />
              )}
            </Drawer>
          </div>
        </div>
        <EmployeesTable
          page={page}
          isLoading={isLoading}
          totalPages={totalPages}
          employees={users}
          selectedEmployeesIds={selectedEmployeesIds}
          onPageChange={handlePageChange}
          onUpdateEmployee={handleUpdateEmployee}
          onEmployeesSelectionChange={handleEmployeesSelectionChange}
        />
      </div>
    </>
  )
}
