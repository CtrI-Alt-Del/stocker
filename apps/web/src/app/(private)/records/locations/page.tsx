import { verifyRolePermissionAction } from '@/actions'
import { LocationsPage } from '@/ui/components/pages/locations'
import { notFound } from 'next/navigation'

const Page = async () => {
  const isValidRole = await verifyRolePermissionAction('categories-control')
  if (!isValidRole) {
    return notFound()
  }

  return <LocationsPage />
}

export default Page
