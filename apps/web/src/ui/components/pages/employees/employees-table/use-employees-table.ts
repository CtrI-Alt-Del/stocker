import type { DrawerRef } from '@/ui/components/commons/drawer/types'
import type { Selection } from '@nextui-org/react'
import type { User } from '@stocker/core/entities'
import { RefObject, useState } from 'react'

type useEmployeesTableProps = {
  employees: User[]
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
  const [employeeBeingEditted, setEmployeeBeingEditted] = useState<User | null>(null)

  function handleEditEmployeeButtonClick(employee: User) {
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
      onEmployeesSelectionChange(employees.map((employee) => employee.id))
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
