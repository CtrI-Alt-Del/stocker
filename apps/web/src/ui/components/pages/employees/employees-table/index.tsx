import { Drawer } from '@/ui/components/commons/drawer'
import { Icon } from '@/ui/components/commons/icon'
import {
  Button,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'
import type { User } from '@stocker/core/entities'
import { UpdateEmployeeForm } from '../update-employee-form'
import { IconButton } from '@/ui/components/commons/icon-button'
import { useRef } from 'react'
import type { DrawerRef } from '@/ui/components/commons/drawer/types'
import { useEmployeesTable } from './use-employees-table'
type EmployeesTableProps = {
  page: number
  isLoading: boolean
  employees: User[]
  totalPages: number
  onPageChange?: (page: number) => void
  onUpdateEmployee?: VoidFunction
  onEmployeesSelectionChange?: (employeesIds: string[]) => void
  selectionMode?: 'single' | 'multiple'
  selectedEmployeesIds: string[]
}
export const EmployeesTable = ({
  page,
  isLoading,
  employees,
  totalPages,
  onPageChange,
  onEmployeesSelectionChange,
  onUpdateEmployee,
  selectionMode,
  selectedEmployeesIds,
}: EmployeesTableProps) => {
  const drawerRef = useRef<DrawerRef>(null)
  const {
    employeeBeingEditted,
    handleEditEmployeeButtonClick,
    handleUpdateEmployeeFormSubmit,
    handleCancelEditting,
    handleDrawerClose,
    handleSelectionChange,
  } = useEmployeesTable({
    employees,
    drawerRef,
    onEmployeesSelectionChange,
    onUpdateEmployee,
  })
  return (
    <>
      <Table
        aria-label='tabela'
        shadow='none'
        selectionMode={selectionMode ? selectionMode : 'multiple'}
        bottomContentPlacement='outside'
        selectedKeys={selectedEmployeesIds}
        onSelectionChange={handleSelectionChange}
        bottomContent={
          totalPages > 1 && (
            <div className='flex w-full justify-start'>
              <Pagination
                aria-label='paginação'
                showControls
                page={page}
                total={totalPages}
                onChange={onPageChange}
              />
            </div>
          )
        }
      >
        <TableHeader>
          <TableColumn key='name'>NOME</TableColumn>
          <TableColumn key='email'>E-MAIL</TableColumn>
          <TableColumn key='role'>CARGO</TableColumn>
          <TableColumn key='action'>{null}</TableColumn>
        </TableHeader>
        <TableBody
          items={employees}
          isLoading={isLoading}
          loadingContent={<Spinner color='primary' />}
          aria-label='counteudo da tabela'
          emptyContent={'Nenhum funcionário cadastrado'}
        >
          {(employee) => (
            <TableRow key={employee.id}>
              <TableCell key='name'>{employee.name}</TableCell>
              <TableCell key='email'>{employee.email}</TableCell>
              <TableCell key='role' className='font-black'>
                {employee.role === 'manager' ? 'Gerente' : 'Funcionário'}
              </TableCell>
              <TableCell key='actions'>
                <Tooltip content='Editar Funcinário'>
                  <IconButton
                    name='view'
                    tooltip='Editar Funcionário'
                    className='size-6 text-zinc-500'
                    onClick={() => handleEditEmployeeButtonClick(employee)}
                  />
                </Tooltip>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Drawer ref={drawerRef} trigger={null} onClose={handleDrawerClose}>
        {() =>
          employeeBeingEditted && (
            <UpdateEmployeeForm
              employee={employeeBeingEditted}
              onSubmit={handleUpdateEmployeeFormSubmit}
              onCancel={handleCancelEditting}
            />
          )
        }
      </Drawer>
    </>
  )
}
