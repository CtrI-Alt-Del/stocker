import { verifyRolePermissionAction } from '@/actions'
import { SuppliersPage } from '@/ui/components/pages/suppliers'
import { notFound } from 'next/navigation'

const Page = async () => {
  const isValidRole = await verifyRolePermissionAction('suppliers-control')
  if (!isValidRole) {
    return notFound()
  }

  return <SuppliersPage />
}

export default Page
