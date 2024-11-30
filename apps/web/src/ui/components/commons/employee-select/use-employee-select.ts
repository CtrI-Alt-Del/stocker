import { useApi, useCache, useToast, useUrlParamNumber } from '@/ui/hooks'
import { useState } from 'react'
import { useAuthContext } from '../../contexts/auth-context'
import { CACHE } from '@/constants'
import { User } from '@stocker/core/entities'

export function useEmployeeSelect(onSelectChange: (employeeId: string) => void) {
  const [employeeId, setEmployeeId] = useState<string>()
  const [selectedEmployeeName,setSelectedEmployeeName] = useState<string>()
  const { usersService } = useApi()
  const { company } = useAuthContext()
  const { showError } = useToast()
  const [page, setPage] = useUrlParamNumber('employeePage', 1)
  function handleEmployeeIdchange(employeeId: string) {
    setEmployeeId(employeeId)
    onSelectChange(employeeId)
  }
  function handleEmployeeNamechange(name:string){
    setSelectedEmployeeName(name)
  }
  async function fetchEmployees() {
    if (!company) return
    const response = await usersService.listUsers({
      page,
      companyId: company.id,
    })
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }
    return response.body
  }
  const { data, refetch, isFetching } = useCache({
    fetcher: fetchEmployees,
    key: CACHE.users.key,
    dependencies: [page],
  })
  function handlePagechange(page:number){
    setPage(page)
  }
  console.log(data)
  const employees = data ? data.items : []
  const itemsCount = data ? data.itemsCount : 0
  return {
    isFetching,
    totalPages: Math.ceil(itemsCount / 10),
    page,
    employees,
    handleEmployeeIdchange,
    handleEmployeePageChange: handlePagechange,
    handleEmployeeNamechange,
    selectedEmployeeName
  }
}
