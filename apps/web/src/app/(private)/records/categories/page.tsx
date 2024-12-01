import { verifyRolePermissionAction } from '@/actions'
import { CategoriesPage } from '@/ui/components/pages/categories'
import { notFound } from 'next/navigation'

const Page = async () => {
  const isValidRole = await verifyRolePermissionAction('all')
  if (!isValidRole) {
    return notFound()
  }
  return <CategoriesPage />
}

export default Page
