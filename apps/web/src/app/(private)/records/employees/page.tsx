import { verifyUserRoleAction } from '@/actions'
import { EmployeesPage } from '@/ui/components/pages/employees'
import { notFound } from 'next/navigation'

const Page = async () => {
  const isValidRole = await verifyUserRoleAction('admin')
  if (!isValidRole) return notFound()

  return <EmployeesPage />
}

export default Page
