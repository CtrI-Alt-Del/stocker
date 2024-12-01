import { verifyRolePermissionAction } from '@/actions'
import { DashboardPage } from '@/ui/components/pages/dashboard'
import { notFound } from 'next/navigation'

const Page = async () => {
  const isValidRole = await verifyRolePermissionAction('reports')
  if (!isValidRole) {
    return notFound()
  }

  return <DashboardPage />
}

export default Page
