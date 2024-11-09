import { NextServerApiClient } from '@/api/next/clients/next-server-api-client'
import { ReportsService } from '@/api/services'
import { Card } from '@/ui/components/commons/card'

export const EmployeesCards = async () => {
  const apiClient = await NextServerApiClient({ isCacheEnabled: false })
  const reportsService = ReportsService(apiClient)
  const data = await reportsService.reportSummary()
  const employeeCount = data.body.employeecount
  const managerCount = data.body.managercount

  return (
    <div className='flex justify-center  items-center gap-6  flex-1 flex-col    '>
      <Card
        title='Funcionários'
        value={employeeCount}
        href='/records/employees'
        icon='user'
      />
      <Card
        title='Gerentes'
        value={managerCount}
        href='/records/employees'
        icon='user'
      />
    </div>
  )
}
