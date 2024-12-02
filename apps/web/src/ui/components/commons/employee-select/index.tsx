import { Button, Pagination, Spinner } from '@nextui-org/react'
import { useEmployeeSelect } from './use-employee-select'
import { Dialog } from '../dialog'
import { Icon } from '../icon'
import { Select } from '../select'

type EmployeeSelectProps = {
  onSelectChange: (employeeId: string) => void
  className?:string
}

export const EmployeeSelect = ({ onSelectChange,className }: EmployeeSelectProps) => {
  const {
    employees,
    isFetching,
    page,
    totalPages,
    selectedEmployeeName,
    handleEmployeeIdchange,
    handleEmployeePageChange,
    handleEmployeeNamechange,
  } = useEmployeeSelect(onSelectChange)

  return isFetching ? (
    <Spinner size='sm' className='w-full h-full mx-auto' />
  ) : (
    <div className='space-y-2 flex flex-row gap-4 items-center w-full'>
      <Dialog
        title='Selecione o Funcionário'
        size='2xl'
        trigger={
          <Select className={className}>
            {selectedEmployeeName ? selectedEmployeeName : 'Selecione o funcionario'}
          </Select>
        }
      >
        {(closeDrawer) =>
          employees.length === 0 ? (
            <p className='text-center text-zinc-600 font-semibold my-12'>
              Nenhum funcionário encontrado
            </p>
          ) : (
            <>
              <div className='space-y-4'>
                {employees.map((employee) => (
                  <div
                    key={employee.id}
                    className='flex items-center justify-between p-4 border border-zinc-300 rounded-lg'
                  >
                    <span className='font-medium text-zinc-800'>{employee.name}</span>
                    <Button
                      className='bg-transparent hover:bg-primary hover:text-white duration-1000 border-zinc-400 h-10 min-w-10'
                      onClick={() => {
                        handleEmployeeNamechange(employee.name)

                        handleEmployeeIdchange(employee.id as string)
                        closeDrawer()
                      }}
                    >
                      <Icon name='plus' size={18} />
                    </Button>
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <Pagination
                  page={page}
                  total={totalPages}
                  onChange={handleEmployeePageChange}
                  showControls
                  className='pb-8 pt-8'
                />
              )}
            </>
          )
        }
      </Dialog>
      {selectedEmployeeName && (
        <button
          type='button'
          onClick={() => {
            handleEmployeeNamechange('')
            handleEmployeeIdchange('')
          }}
          className='flex justify-center items-center gap-2 text-xs text-gray-400'
        >
          Remover Filtro <Icon name='close' className='size-4' />
        </button>
      )}
    </div>
  )
}
