import { verifyUserRoleAction } from '@/actions'
import { SuppliersPage } from '@/ui/components/pages/suppliers'
import { notFound } from 'next/navigation'

const Page = async () => {
  const isValidRole = await verifyUserRoleAction('manager')
  if (!isValidRole) {
    return notFound()
  }

  return <SuppliersPage />
}

export default Page
