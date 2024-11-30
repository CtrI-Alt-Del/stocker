import type { DrawerRef } from '@/ui/components/commons/drawer/types'
import type { Selection } from '@nextui-org/react'
import type { UserDto } from '@stocker/core/dtos'
import type { RefObject } from 'react'
import { useState } from 'react'

type useEmployeesTableProps = {
  employees: UserDto[]
  drawerRef: RefObject<DrawerRef>
  onUpdateEmployee?: VoidFunction
  onEmployeesSelectionChange?: (employeesIds: string[]) => void
}
export function useEmployeesTable({
  employees,
  drawerRef,
  onUpdateEmployee,
  onEmployeesSelectionChange,
}: useEmployeesTableProps) {
  const [employeeBeingEditted, setEmployeeBeingEditted] = useState<UserDto | null>(null)

  function handleEditEmployeeButtonClick(employee: UserDto) {
    setEmployeeBeingEditted(employee)
    drawerRef.current?.open()
  }
  function handleDrawerClose() {
    setEmployeeBeingEditted(null)
  }
  function handleCancelEditting() {
    setEmployeeBeingEditted(null)
    drawerRef.current?.close()
  }
  function handleUpdateEmployeeFormSubmit() {
    setEmployeeBeingEditted(null)
    drawerRef.current?.close()
    if (onUpdateEmployee) onUpdateEmployee()
  }
  function handleSelectionChange(selection: Selection) {
    if (!onEmployeesSelectionChange) return
    if (selection === 'all') {
      onEmployeesSelectionChange(employees.map((employee) => employee.id || ''))
    }
    onEmployeesSelectionChange(Array.from(selection) as string[])
  }
  return {
    employeeBeingEditted,
    handleCancelEditting,
    handleUpdateEmployeeFormSubmit,
    handleEditEmployeeButtonClick,
    handleSelectionChange,
    handleDrawerClose,
  }
}
