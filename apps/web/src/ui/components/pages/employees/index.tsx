'use client'

import { Button } from '@nextui-org/react'

import { Drawer } from '../../commons/drawer'
import { Search } from '../../commons/search'
import { EmployeesTable } from './employees-table'
import { RegisterEmployeeForm } from './register-employee-form'
import { useEmployeesPage } from './use-employees-page'

export const EmployeesPage = () => {
  const { page, handlePageChange, totalPages, tempoUser, isLoading } = useEmployeesPage()
  return (
    <>
      <div className='space-y-5'>
        <div className='flex flex-col gap-3 md:flex-row md:gap-0 justify-between'>
          <div className='flex-1 w-full max-w-96 space-y-2'>
            <h1 className='text-3xl font-black'>Funcionários</h1>
            <Search value={''} onSearchChange={() => { }} />
          </div>
          <div className='flex items-center justify-center gap-1'>
            <Drawer
              trigger={
                <Button variant='solid' color='primary' size='md'>
                  Adicionar Funcionário
                </Button>
              }
            >
              {(closeDrawer) => (
                <RegisterEmployeeForm onSubmit={() => { }} onCancel={closeDrawer} />
              )}
            </Drawer>
          </div>
        </div>
        <EmployeesTable
          page={page}
          onPageChange={handlePageChange}
          isLoading={isLoading}
          totalPages={totalPages}
          employees={tempoUser}
        />
      </div>
    </>
  )
}
