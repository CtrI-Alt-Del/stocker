import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { User } from '@stocker/core/entities'
type EmployeesTableProps = {
  page: number
  isLoading: boolean
  employees: User[]
  totalPages: number
  onPageChange?: (page: number) => void
}
export const EmployeesTable = ({
  page,
  isLoading,
  employees,
  totalPages,
  onPageChange,
}: EmployeesTableProps) => {
  return (
    <>
      <Table
        aria-label='tabela'
        shadow='none'
        bottomContentPlacement='outside'
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
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
