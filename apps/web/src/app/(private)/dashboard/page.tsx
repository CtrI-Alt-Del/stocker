import { verifyUserRoleAction } from '@/actions'
import { DashboardPage } from '@/ui/components/pages/dashboard'
import { notFound } from 'next/navigation'

const Page = async () => {
  const isValidRole = await verifyUserRoleAction('manager')
  if (!isValidRole) {
    return notFound()
  }

  return <DashboardPage />
}

export default Page
