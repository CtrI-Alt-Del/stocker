import { verifyRolePermissionAction } from '@/actions'
import { ProfilePage } from '@/ui/components/pages/profile'
import { notFound } from 'next/navigation'

const Page = async () => {
  const hasValidRole = await verifyRolePermissionAction('all')
  if (!hasValidRole) {
    return notFound()
  }
  return <ProfilePage />
}

export default Page
