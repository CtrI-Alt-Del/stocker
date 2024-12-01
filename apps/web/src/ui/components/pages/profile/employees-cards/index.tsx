import { NextServerApiClient } from '@/api/next/clients/next-server-api-client'
import { UsersService } from '@/api/services/users-service'
import { Card } from '@/ui/components/commons/card'

export const EmployeesCards = async () => {
  const apiClient = await NextServerApiClient({ isCacheEnabled: false })
  const usersService = UsersService(apiClient)
  const response = await usersService.countCompanyUsers()

  if (response.isFailure) return

  return (
    <div className='flex justify-center  items-center gap-6  flex-1 flex-col    '>
      <Card
        title='Funcionários'
        value={response.body.employeesCount}
        href='/records/employees?role=employee'
        icon='user'
      />
      <Card
        title='Gerentes'
        value={response.body.managersCount}
        href='/records/employees?role=manager'
        icon='user'
      />
    </div>
  )
}
